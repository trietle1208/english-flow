"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Mic, MicOff, Square } from "lucide-react";
import { toast } from "sonner";
import { AudioButton } from "@/components/shared/AudioButton";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionCard } from "@/components/shared/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStudyHeartbeat } from "@/features/study-time/useStudyHeartbeat";
import { submitSpeakingAttempt } from "../actions";
import { diffTranscript, type ComparedToken } from "../compare";
import type { SpeakingAttemptSummary } from "../types";

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type BrowserSpeechRecognitionEvent = {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

type SpeechRecognitionCtor = new () => BrowserSpeechRecognition;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") {
    return null;
  }
  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null;
}

function TokenLine({ tokens, emptyLabel }: { tokens: ComparedToken[]; emptyLabel: string }) {
  if (tokens.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <p className="flex flex-wrap gap-x-1.5 gap-y-1 text-base leading-relaxed">
      {tokens.map((item, index) => (
        <span
          key={`${item.token}-${index}`}
          className={
            item.matched
              ? "rounded-sm bg-emerald-500/15 px-0.5 text-emerald-800 dark:text-emerald-300"
              : "rounded-sm bg-destructive/10 px-0.5 text-destructive"
          }
        >
          {item.token}
        </span>
      ))}
    </p>
  );
}

type SpeechPracticeProps = {
  promptId: string;
  promptText: string;
  audioUrl: string | null;
  lastAttempt: SpeakingAttemptSummary | null;
};

export function SpeechPractice({
  promptId,
  promptText,
  audioUrl,
  lastAttempt,
}: SpeechPracticeProps) {
  const t = useTranslations("speaking");
  const tCommon = useTranslations("common");
  useStudyHeartbeat();

  const [asrSupported, setAsrSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [recording, setRecording] = useState(false);
  const [micError, setMicError] = useState<"denied" | "unavailable" | null>(null);
  const [recognizedText, setRecognizedText] = useState(lastAttempt?.recognizedText ?? "");
  const [overlapPercent, setOverlapPercent] = useState<number | null>(
    lastAttempt?.overlapPercent ?? null,
  );
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const playbackUrlRef = useRef<string | null>(null);

  useEffect(() => {
    setAsrSupported(getSpeechRecognitionCtor() !== null);
  }, []);

  const revokePlayback = useCallback(() => {
    if (playbackUrlRef.current) {
      URL.revokeObjectURL(playbackUrlRef.current);
      playbackUrlRef.current = null;
    }
    setPlaybackUrl(null);
  }, []);

  const stopMedia = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    mediaRecorderRef.current = null;
    setRecording(false);
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      stopMedia();
      revokePlayback();
    };
  }, [revokePlayback, stopMedia]);

  const startRecognition = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      return;
    }

    setMicError(null);
    recognitionRef.current?.abort();
    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (!result) continue;
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }
      setRecognizedText((finalText || interimText).trim());
    };
    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setMicError("denied");
      } else if (event.error !== "no-speech" && event.error !== "aborted") {
        setMicError("unavailable");
      }
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
      setListening(true);
    } catch {
      setMicError("unavailable");
      setListening(false);
    }
  }, []);

  const stopRecognition = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const startRecording = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setMicError("unavailable");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        revokePlayback();
        const url = URL.createObjectURL(blob);
        playbackUrlRef.current = url;
        setPlaybackUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      setMicError(null);
    } catch (error) {
      const denied =
        error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "SecurityError");
      setMicError(denied ? "denied" : "unavailable");
    }
  }, [revokePlayback]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  }, []);

  async function handleSubmit() {
    if (!recognizedText.trim()) {
      return;
    }
    setSubmitting(true);
    const result = await submitSpeakingAttempt({
      promptId,
      recognizedText,
    });
    setSubmitting(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    setOverlapPercent(result.data.overlapPercent);
    toast.success(t("toastSaved", { percent: result.data.overlapPercent }));
  }

  const comparison = diffTranscript(promptText, recognizedText);

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title={t("prompt")}
        description={t("promptHelp")}
        actions={<AudioButton word={promptText} audioUrl={audioUrl} />}
      >
        <p className="text-base leading-relaxed">{promptText}</p>
      </SectionCard>

      {micError === "denied" ? (
        <EmptyState
          icon={MicOff}
          title={t("micDeniedTitle")}
          description={t("micDeniedDescription")}
        />
      ) : null}

      {!asrSupported ? (
        <EmptyState
          icon={MicOff}
          title={t("asrUnsupportedTitle")}
          description={t("asrUnsupportedDescription")}
        />
      ) : null}

      {micError === "unavailable" ? (
        <p className="text-sm text-destructive">{t("micUnavailable")}</p>
      ) : null}

      <SectionCard title={t("practice")} description={t("practiceHelp")}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {asrSupported ? (
              <Button
                type="button"
                variant={listening ? "destructive" : "default"}
                onClick={listening ? stopRecognition : startRecognition}
                disabled={micError === "denied"}
              >
                {listening ? (
                  <>
                    <Square className="size-4" aria-hidden="true" />
                    {t("stopListening")}
                  </>
                ) : (
                  <>
                    <Mic className="size-4" aria-hidden="true" />
                    {t("startListening")}
                  </>
                )}
              </Button>
            ) : null}
            <Button
              type="button"
              variant="outline"
              onClick={recording ? stopRecording : () => void startRecording()}
              disabled={micError === "denied"}
            >
              {recording ? t("stopRecording") : t("recordLocally")}
            </Button>
          </div>

          {playbackUrl ? (
            <audio controls src={playbackUrl} className="w-full">
              {t("playRecording")}
            </audio>
          ) : null}

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-medium">{t("youSaid")}</h3>
              {overlapPercent != null ? (
                <Badge variant="outline">{t("lastScore", { percent: overlapPercent })}</Badge>
              ) : null}
            </div>
            <TokenLine tokens={comparison.recognized} emptyLabel={t("noRecognizedYet")} />
          </div>

          {recognizedText ? (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{t("compare")}</h3>
              <TokenLine tokens={comparison.expected} emptyLabel={t("noRecognizedYet")} />
            </div>
          ) : null}

          {asrSupported ? (
            <Button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={submitting || !recognizedText.trim()}
            >
              {submitting ? tCommon("saving") : t("saveAttempt")}
            </Button>
          ) : null}
        </div>
      </SectionCard>
    </div>
  );
}

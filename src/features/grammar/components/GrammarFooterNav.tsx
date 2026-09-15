import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type GrammarFooterNavProps = {
  previousTopicId: string | null;
  nextTopicId: string | null;
};

export function GrammarFooterNav({
  previousTopicId,
  nextTopicId,
}: GrammarFooterNavProps) {
  return (
    <footer className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      {previousTopicId ? (
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={`/grammar/${previousTopicId}`}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Previous topic
          </Link>
        </Button>
      ) : (
        <Button variant="outline" disabled className="w-full sm:w-auto">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Previous topic
        </Button>
      )}

      {nextTopicId ? (
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={`/grammar/${nextTopicId}`}>
            Next topic
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/grammar">
            Back to grammar
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      )}
    </footer>
  );
}

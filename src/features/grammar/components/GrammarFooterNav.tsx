import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type GrammarFooterNavProps = {
  previousSlug: string | null;
  nextSlug: string | null;
};

export function GrammarFooterNav({ previousSlug, nextSlug }: GrammarFooterNavProps) {
  return (
    <footer className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      {previousSlug ? (
        <Button asChild variant="outline" className="min-h-11 w-full sm:w-auto">
          <Link href={`/grammar/${previousSlug}`}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Chủ điểm trước
          </Link>
        </Button>
      ) : (
        <Button variant="outline" disabled className="min-h-11 w-full sm:w-auto">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Chủ điểm trước
        </Button>
      )}

      {nextSlug ? (
        <Button asChild variant="outline" className="min-h-11 w-full sm:w-auto">
          <Link href={`/grammar/${nextSlug}`}>
            Chủ điểm tiếp
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <Button asChild variant="outline" className="min-h-11 w-full sm:w-auto">
          <Link href="/grammar">
            Về danh sách
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      )}
    </footer>
  );
}

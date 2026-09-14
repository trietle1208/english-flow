import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";

/**
 * Global 404 — matches any URL with no route. Next.js statically optimizes
 * the root `not-found.tsx` for genuinely-unmatched URLs and doesn't support
 * reading `headers()`/`cookies()` there (unlike a `notFound()` thrown from
 * inside a matched page), so this can't branch on whether there's a session
 * — it always points home, whether or not the visitor is signed in.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <EmptyState
        icon={Compass}
        title="Page not found"
        description="The page you're looking for doesn't exist or may have moved."
        action={
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
        }
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions";

/** Account actions for Settings (spec §22) — logout ends the DB session. */
export function AccountSection() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    const result = await logoutAction();
    if (!result.ok) {
      toast.error(result.error);
      setPending(false);
      return;
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <SectionCard
      title="Account"
      description="Sign out of EnglishFlow on this device, or send product feedback."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="outline" className="min-h-11 w-full sm:w-auto">
          <Link href="/feedback">
            <MessageSquarePlus aria-hidden="true" />
            Góp Ý
          </Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-11 w-full sm:w-auto"
          onClick={handleLogout}
          disabled={pending}
        >
          {pending ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : (
            <LogOut aria-hidden="true" />
          )}
          Log out
        </Button>
      </div>
    </SectionCard>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
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
      description="Sign out of EnglishFlow on this device."
    >
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
    </SectionCard>
  );
}

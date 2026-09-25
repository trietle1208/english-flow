"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions";
import { useTranslations } from "next-intl";

/** Account actions for Settings (spec §22) — logout ends the DB session. */
export function AccountSection() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");

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
      title={t("account")}
      description={t("accountDescription")}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="outline" className="min-h-11 w-full sm:w-auto">
          <Link href="/feedback">
            <MessageSquarePlus aria-hidden="true" />
            {tCommon("feedback")}
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
          {tCommon("logout")}
        </Button>
      </div>
    </SectionCard>
  );
}

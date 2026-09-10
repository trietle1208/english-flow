"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions";

/**
 * Temporary placement (spec §7) — Phase 05 moves this into the sidebar's
 * `AppShell`.
 */
export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      const result = await logoutAction();

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      router.push("/login");
      router.refresh();
    });
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} disabled={isPending}>
      <LogOut />
      Logout
    </Button>
  );
}

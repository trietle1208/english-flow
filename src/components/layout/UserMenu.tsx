"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, MessageSquarePlus, Settings } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/features/auth/actions";
import type { CurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type UserMenuProps = {
  user: CurrentUser;
  /** Icon-only trigger for the collapsed (tablet) sidebar — no name/email next to the avatar. */
  collapsed?: boolean;
  className?: string;
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/**
 * Avatar trigger → dropdown with name, email, Settings link and Logout
 * (spec §4 sidebar "Bottom section"). Used at the bottom of the desktop/
 * tablet `Sidebar` and inside the mobile drawer (`AppHeader`).
 */
export function UserMenu({ user, collapsed = false, className }: UserMenuProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("common");

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-md p-2 text-left text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            collapsed && "justify-center",
            className,
          )}
        >
          <Avatar className="size-8">
            <AvatarImage src={user.image ?? undefined} alt="" />
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{user.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <span className="block truncate text-sm font-medium">{user.name}</span>
          <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/feedback">
            <MessageSquarePlus />
            {t("feedback")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings />
            {t("settings")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled={isPending} onSelect={handleLogout}>
          <LogOut />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

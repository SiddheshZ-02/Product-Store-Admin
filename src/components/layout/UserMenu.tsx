import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar } from "@/components/ui/avatar";

import { useAuthStore } from "@/store/authStore";

export default function UserMenu() {
  const { profile } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <div className="flex h-full items-center justify-center">
            {profile?.full_name?.charAt(0)}
          </div>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          {profile?.email}
        </DropdownMenuItem>

        <DropdownMenuItem>
          {profile?.role}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
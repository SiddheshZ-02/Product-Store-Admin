import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

import { authService } from "@/services/authService";

import { useAuthStore } from "@/store/authStore";

export default function AuthListener() {
  const setUser =
    useAuthStore(
      (state) => state.setUser
    );

  useEffect(() => {
    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        async (
          event,
          session
        ) => {
          if (
            event ===
              "SIGNED_OUT" ||
            !session
          ) {
            setUser(
              null,
              null
            );

            return;
          }

          const profile =
            await authService.getProfile(
              session.user.id
            );

          setUser(
            session.user,
            profile
          );
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return null;
}
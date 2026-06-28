import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "@/services/settingsService";
import { useAuth } from "./useAuth";

export const useSettings = () => {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["settings", profile?.tenant_id],
    queryFn: () => profile?.tenant_id ? settingsService.getSettings(profile.tenant_id) : null,
    enabled: !!profile?.tenant_id,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  return useMutation({
    mutationFn: (settings: Parameters<typeof settingsService.updateSettings>[1]) => {
      if (!profile?.tenant_id) throw new Error("No tenant ID");
      return settingsService.updateSettings(profile.tenant_id, settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};

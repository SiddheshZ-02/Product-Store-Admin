import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscriptionService";
import type { CreateSubscriptionPayload, UpdateSubscriptionPayload } from "@/types/subscription.types";

export const useSubscriptions = () =>
  useQuery({
    queryKey: ["subscriptions"],
    queryFn: subscriptionService.getSubscriptions,
  });

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSubscriptionPayload) =>
      subscriptionService.createSubscription(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSubscriptionPayload;
    }) => subscriptionService.updateSubscription(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

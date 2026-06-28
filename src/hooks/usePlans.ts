import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { planService } from "@/services/planService";
import type { CreatePlanPayload, UpdatePlanPayload } from "@/types/plan.types";

export const usePlans = () =>
  useQuery({
    queryKey: ["plans"],
    queryFn: planService.getPlans,
  });

export const usePlan = (id: string) =>
  useQuery({
    queryKey: ["plan", id],
    queryFn: () => planService.getPlan(id),
    enabled: !!id,
  });

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePlanPayload) => planService.createPlan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePlanPayload }) =>
      planService.updatePlan(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => planService.deletePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

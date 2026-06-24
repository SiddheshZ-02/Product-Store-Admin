import { supabase } from "@/lib/supabase";
import type { DashboardSummary } from "@/types/dashboard.types";

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const { data, error } = await supabase.rpc(
      "get_dashboard_summary"
    );

    if (error) throw error;

    return data as DashboardSummary;
  },
};
import { supabase } from "@/lib/supabase";
import type { DashboardSummary } from "@/types/dashboard.types";

export const dashboardService = {

async getAnalytics(): Promise<DashboardSummary> {
  const { data, error } =
    await supabase.rpc(
      "get_dashboard_summary"
    );

  if (error) throw error;

  return data;
},

  
  async getCharts(
  from: string,
  to: string
) {
  const { data, error } =
    await supabase.rpc(
      "get_dashboard_charts",
      {
        p_from: from,
        p_to: to,
      }
    );

  if (error)
    throw error;

  return data;
},
async getTopProducts() {
  const { data, error } =
    await supabase.rpc(
      "get_top_products"
    );

  if (error)
    throw error;

  return data;
},

async getLowStock() {
  const { data, error } =
    await supabase.rpc(
      "get_low_stock_products"
    );

  if (error)
    throw error;

  return data;
},

async getRecentSales() {
  const { data, error } =
    await supabase.rpc(
      "get_recent_sales"
    );

  if (error) throw error;

  return data;
},
async getRecentPurchases() {
  const { data, error } =
    await supabase.rpc(
      "get_recent_purchases"
    );

  if (error)
    throw error;

  return data;
},
};
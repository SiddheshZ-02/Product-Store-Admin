import { supabase } from "@/lib/supabase";

export const auditService = {
  async getLogs() {
    const { data, error } =
      await supabase
        .from("audit_logs")
        .select(`
          *,
          profiles(
            full_name
          )
        `)
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) throw error;

    return data;
  },
};
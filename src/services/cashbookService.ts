import { supabase } from "@/lib/supabase";

export const cashbookService = {
  async getCashbook(
    from: string,
    to: string
  ) {
    const { data, error } =
      await supabase.rpc(
        "get_cashbook",
        {
          p_from: from,
          p_to: to,
        }
      );

    if (error) throw error;

    return data;
  },
};
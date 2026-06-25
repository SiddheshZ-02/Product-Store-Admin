export type DateRangeType =
  | "today"
  | "7days"
  | "30days"
  | "90days"
  | "custom";

export interface DateFilter {
  range: DateRangeType;
  from?: string;
  to?: string;
}
import type {
  DateFilter,
  DateRangeType,
} from "@/types/report";

interface Props {
  value: DateFilter;

  onChange: (
    value: DateFilter
  ) => void;
}

export default function DateFilterComponent({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-3 items-center">

      <select
        value={value.range}
        onChange={(e) =>
       onChange({
  ...value,
  range:
    e.target.value as DateRangeType,
})
        }
        className="border rounded px-3 py-2"
      >
        <option value="today">
          Today
        </option>

        <option value="7days">
          Last 7 Days
        </option>

        <option value="30days">
          Last 30 Days
        </option>

        <option value="90days">
          Last 90 Days
        </option>

        <option value="custom">
          Custom
        </option>
      </select>

      {value.range ===
        "custom" && (
        <>
          <input
            type="date"
            value={
              value.from || ""
            }
            onChange={(e) =>
              onChange({
                ...value,
                from:
                  e.target.value,
              })
            }
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
            value={
              value.to || ""
            }
            onChange={(e) =>
              onChange({
                ...value,
                to:
                  e.target.value,
              })
            }
            className="border rounded px-3 py-2"
          />
        </>
      )}
    </div>
  );
}
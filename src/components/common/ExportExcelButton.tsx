import { exportToExcel }
from "@/utils/exportExcel";

type Props = {
  data: any[];
  fileName: string;
};

export default function ExportExcelButton({
  data,
  fileName,
}: Props) {
  return (
    <button
      onClick={() =>
        exportToExcel(
          data,
          fileName
        )
      }
      className="px-4 py-2 border rounded"
    >
      Export Excel
    </button>
  );
}
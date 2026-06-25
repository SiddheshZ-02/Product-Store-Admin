import { exportToPdf }
from "@/utils/exportPdf";

type Props = {
  title: string;
  columns: string[];
  rows: any[][];
  fileName: string;
};

export default function ExportPdfButton({
  title,
  columns,
  rows,
  fileName,
}: Props) {
  return (
    <button
      onClick={() =>
        exportToPdf(
          title,
          columns,
          rows,
          fileName
        )
      }
      className="px-4 py-2 border rounded"
    >
      Export PDF
    </button>
  );
}
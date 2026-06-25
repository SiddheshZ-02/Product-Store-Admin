import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPdf = (
  title: string,
  columns: string[],
  rows: any[][],
  fileName: string
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [columns],
    body: rows,
  });

  doc.save(`${fileName}.pdf`);
};
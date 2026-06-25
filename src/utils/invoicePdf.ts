import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function downloadInvoicePdf(
  invoice: any
) {
  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "WineERP Invoice",
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Invoice: ${invoice.invoice_number}`,
    14,
    35
  );

  doc.text(
    `Date: ${invoice.sale_date}`,
    14,
    43
  );

  doc.text(
    `Customer: ${
      invoice.customers?.customer_name || ""
    }`,
    14,
    51
  );

  doc.text(
    `Phone: ${
      invoice.customers?.phone || ""
    }`,
    14,
    59
  );

  autoTable(doc, {
    startY: 70,

    head: [
      [
        "Product",
        "Qty",
        "Rate",
        "Total",
      ],
    ],

    body:
      invoice.sale_items?.map(
        (item: any) => [
          item.products?.name,
          item.quantity,
          item.unit_price,
          item.line_total,
        ]
      ) || [],
  });

  const finalY =
    (
      doc as any
    ).lastAutoTable.finalY + 15;

  doc.text(
    `Total: ₹${invoice.total_amount}`,
    14,
    finalY
  );

  doc.text(
    `Paid: ₹${invoice.paid_amount}`,
    14,
    finalY + 8
  );

  doc.text(
    `Due: ₹${invoice.due_amount}`,
    14,
    finalY + 16
  );

  doc.save(
    `${invoice.invoice_number}.pdf`
  );
}
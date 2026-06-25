export const invoiceTemplate = (
  customerName: string,
  invoiceNumber: string,
  amount: number
) => `
Hello ${customerName},

Invoice: ${invoiceNumber}

Amount: ₹${amount}

Thank you for your purchase.

WineERP
`;

export const dueReminderTemplate = (
  customer: string,
  due: number
) => `
Hello ${customer},

This is a friendly reminder.

Outstanding Due:
₹${due}

Please clear the payment.

Thank You
WineERP
`;

export const supplierReminderTemplate = (
  supplierName: string,
  dueAmount: number
) => `
Hello ${supplierName},

Pending payment:

₹${dueAmount}

We will process payment shortly.

Thank You
WineERP
`;


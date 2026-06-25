type Props = {
  data: any[];
};

export default function RecentSalesCard({
  data,
}: Props) {
  return (
    <div className="border rounded-lg p-5 bg-background">
      <div className="mb-4">
        <h3 className="font-semibold text-lg">
          Recent Sales
        </h3>

        <p className="text-sm text-muted-foreground">
          Latest invoices
        </p>
      </div>

      <div className="space-y-4">

        {data?.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No sales found
          </div>
        )}

        {data?.map((sale) => (
          <div
            key={sale.id}
            className="flex items-center justify-between border-b pb-3"
          >
            <div>
              <p className="font-medium">
                {sale.invoice_number}
              </p>

              <p className="text-sm text-muted-foreground">
                {sale.customer_name}
              </p>
            </div>

            <div className="font-semibold">
              ₹
              {Number(
                sale.total_amount
              ).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
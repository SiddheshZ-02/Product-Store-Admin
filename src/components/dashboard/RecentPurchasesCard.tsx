type Props = {
  data: any[];
};

export default function RecentPurchasesCard({
  data,
}: Props) {
  return (
    <div className="border rounded-lg p-5 bg-background">

      <div className="mb-4">
        <h3 className="font-semibold text-lg">
          Recent Purchases
        </h3>

        <p className="text-sm text-muted-foreground">
          Latest supplier purchases
        </p>
      </div>

      <div className="space-y-4">

        {data?.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No purchases found
          </div>
        )}

        {data?.map(
          (purchase: any) => (
            <div
              key={purchase.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">
                  {purchase.purchase_number}
                </p>

                <p className="text-sm text-muted-foreground">
                  {purchase.supplier_name}
                </p>
              </div>

              <div className="font-semibold">
                ₹
                {Number(
                  purchase.total_amount
                ).toLocaleString()}
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}
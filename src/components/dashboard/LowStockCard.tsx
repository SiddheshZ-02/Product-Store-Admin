type Props = {
  data: any[];
};

export default function LowStockCard({
  data,
}: Props) {
  return (
    <div className="border rounded-lg p-4">

      <h2 className="font-semibold mb-4">
        Low Stock Alert
      </h2>

      {data?.map(
        (item, index) => (
          <div
            key={index}
            className="flex justify-between py-2"
          >
            <span>
              {item.product_name}
            </span>

            <span>
              {item.current_stock}
            </span>
          </div>
        )
      )}

    </div>
  );
}
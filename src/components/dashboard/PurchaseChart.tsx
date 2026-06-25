import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
};

export default function PurchaseChart({
  data,
}: Props) {
  return (
    <div className="border rounded-lg p-4">

      <h2 className="font-semibold mb-4">
        Purchase Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
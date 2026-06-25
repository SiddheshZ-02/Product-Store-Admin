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

export default function RevenueChart({
  data,
}: Props) {
  return (
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
          dataKey="sales"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
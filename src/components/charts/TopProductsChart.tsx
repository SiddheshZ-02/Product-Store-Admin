import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
};

export default function TopProductsChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={data}>
        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="qty" />
      </BarChart>
    </ResponsiveContainer>
  );
}
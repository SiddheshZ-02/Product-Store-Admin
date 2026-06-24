interface Props {
  title: string;
  value: string | number;
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>
    </div>
  );
}
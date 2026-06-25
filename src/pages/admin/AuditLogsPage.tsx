import {
  useAuditLogs,
} from "@/hooks/useAuditLogs";

export default function AuditLogsPage() {

  const {
    data = [],
    isLoading,
  } = useAuditLogs();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Audit Logs
      </h1>

      <div className="border rounded-lg overflow-hidden">

        <table className="w-full">

          <thead>
            <tr>

              <th className="p-3">
                User
              </th>

              <th className="p-3">
                Action
              </th>

              <th className="p-3">
                Table
              </th>

              <th className="p-3">
                Date
              </th>

            </tr>
          </thead>

          <tbody>

            {data.map(
              (log: any) => (
                <tr
                  key={log.id}
                >
                  <td className="p-3">
                    {
                      log.profiles
                        ?.full_name
                    }
                  </td>

                  <td className="p-3">
                    {log.action}
                  </td>

                  <td className="p-3">
                    {
                      log.table_name
                    }
                  </td>

                  <td className="p-3">
                    {new Date(
                      log.created_at
                    ).toLocaleString()}
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
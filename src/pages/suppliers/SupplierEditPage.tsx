import {
  useParams,
  useNavigate,
} from "react-router-dom";

import SupplierForm from "@/components/forms/SupplierForm";

import {
  useSupplier,
  useUpdateSupplier,
} from "@/hooks/useSuppliers";

export default function SupplierEditPage() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    data,
    isLoading,
  } = useSupplier(id!);

  const mutation =
    useUpdateSupplier();

  if (isLoading)
    return <div>Loading...</div>;

  if (!data)
    return (
      <div>
        Supplier not found
      </div>
    );

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Supplier
      </h1>

      <SupplierForm
        defaultValues={{
          supplier_name:
            data.supplier_name,

          contact_person:
            data.contact_person ??
            "",

          phone:
            data.phone ?? "",

          email:
            data.email ?? "",

          gst_number:
            data.gst_number ??
            "",

          address:
            data.address ??
            "",
        }}
        loading={
          mutation.isPending
        }
        onSubmit={async (
          values
        ) => {
          await mutation.mutateAsync(
            {
              id,
              payload:
                values,
            }
          );

          navigate(
            "/suppliers"
          );
        }}
      />
    </div>
  );
}
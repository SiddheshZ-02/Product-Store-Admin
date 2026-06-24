import {
  useNavigate,
  useParams,
} from "react-router-dom";

import CustomerForm from "@/components/forms/CustomerForm";

import {
  useCustomer,
  useUpdateCustomer,
} from "@/hooks/useCustomers";
import type { CustomerFormData } from "@/types/customerSchema";


export default function CustomerEditPage() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    data,
    isLoading,
  } = useCustomer(id!);

  const mutation =
    useUpdateCustomer();

  const handleSubmit = async (
    values: CustomerFormData
  ) => {
    await mutation.mutateAsync({
      id,
      payload: values,
    });

    navigate("/customers");
  };

  if (isLoading)
    return (
      <div>
        Loading...
      </div>
    );

  if (!data)
    return (
      <div>
        Customer not found
      </div>
    );

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Customer
      </h1>

      <CustomerForm
        defaultValues={{
          customer_name:
            data.customer_name,

          phone:
            data.phone ?? "",

          email:
            data.email ?? "",

          address:
            data.address ?? "",

          gst_number:
            data.gst_number ??
            "",

          notes:
            data.notes ?? "",
        }}
        onSubmit={
          handleSubmit
        }
        loading={
          mutation.isPending
        }
      />
    </div>
  );
}
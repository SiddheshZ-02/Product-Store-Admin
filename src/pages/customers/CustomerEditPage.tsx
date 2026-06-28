import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "sonner";

import CustomerForm from "@/components/forms/CustomerForm";
import BackButton from "@/components/common/BackButton";

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
    try {
      await mutation.mutateAsync({
        id,
        payload: values,
      });

      navigate("/customers");
    } catch (error: any) {
      toast.error(error.message || "Failed to update customer");
      console.error(error);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        Customer not found
      </div>
    );

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <BackButton to="/customers" />
        <h1 className="text-3xl font-bold">
          Edit Customer
        </h1>
      </div>

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
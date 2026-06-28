import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import CustomerForm from "@/components/forms/CustomerForm";
import BackButton from "@/components/common/BackButton";


import {
  useCreateCustomer,
} from "@/hooks/useCustomers";
import type { CustomerFormData } from "@/types/customerSchema";

export default function CustomerCreatePage() {
  const navigate =
    useNavigate();

  const mutation =
    useCreateCustomer();

  const handleSubmit = async (
    values: CustomerFormData
  ) => {
    try {
      await mutation.mutateAsync(
        values
      );

      navigate("/customers");
    } catch (error: any) {
      toast.error(error.message || "Failed to create customer");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <BackButton to="/customers" />
        <h1 className="text-3xl font-bold">
          Create Customer
        </h1>
      </div>

      <CustomerForm
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
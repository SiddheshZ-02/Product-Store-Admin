import { useNavigate } from "react-router-dom";

import CustomerForm from "@/components/forms/CustomerForm";


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
    await mutation.mutateAsync(
      values
    );

    navigate("/customers");
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Customer
      </h1>

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
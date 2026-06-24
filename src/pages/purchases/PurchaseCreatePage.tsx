import { useNavigate } from "react-router-dom";

import PurchaseForm from "@/components/forms/PurchaseForm";

import { useCreatePurchase } from "@/hooks/usePurchases";

export default function PurchaseCreatePage() {
  const navigate =
    useNavigate();

  const mutation =
    useCreatePurchase();

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Purchase
      </h1>

      <PurchaseForm
        loading={
          mutation.isPending
        }
        onSubmit={async (
          values
        ) => {
          await mutation.mutateAsync(
            values
          );

          navigate(
            "/purchases"
          );
        }}
      />
    </div>
  );
}
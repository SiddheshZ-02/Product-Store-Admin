// src/pages/sales/SalesCreatePage.tsx

import SalesForm from "@/components/forms/SalesForm";
import { useCreateSale } from "@/hooks/useSales";
import { useNavigate } from "react-router-dom";

export default function SalesCreatePage() {
  const navigate =
    useNavigate();

  const createSale =
    useCreateSale();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Sales POS
      </h1>

      <SalesForm
        loading={
          createSale.isPending
        }
        onSubmit={async (
          values
        ) => {
          await createSale.mutateAsync(
            values
          );

          navigate("/sales");
        }}
      />
    </div>
  );
}
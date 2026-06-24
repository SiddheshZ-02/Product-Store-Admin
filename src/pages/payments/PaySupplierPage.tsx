import {
  useForm,
} from "react-hook-form";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { usePaySupplier }
  from "@/hooks/usePayments";

export default function PaySupplierPage() {
  const { purchaseId } =
    useParams();

  const navigate =
    useNavigate();

  const mutation =
    usePaySupplier();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      p_payment_method:
        "CASH",
    },
  });

  const submit =
    async (data: any) => {
      await mutation.mutateAsync({
        p_purchase_id:
          purchaseId!,
        ...data,
      });

      navigate(
        "/payments/supplier"
      );
    };

  return (
    <form
      onSubmit={handleSubmit(
        submit
      )}
      className="space-y-4 max-w-lg"
    >
      <h1 className="text-3xl font-bold">
        Pay Supplier
      </h1>

      <input
        type="number"
        placeholder="Amount"
        {...register(
          "p_amount",
          {
            valueAsNumber:
              true,
          }
        )}
      />

      <select
        {...register(
          "p_payment_method"
        )}
      >
        <option value="CASH">
          CASH
        </option>

        <option value="UPI">
          UPI
        </option>

        <option value="CARD">
          CARD
        </option>

        <option value="BANK_TRANSFER">
          BANK TRANSFER
        </option>

        <option value="CHEQUE">
          CHEQUE
        </option>
      </select>

      <input
        placeholder="Reference Number"
        {...register(
          "p_reference_number"
        )}
      />

      <textarea
        placeholder="Notes"
        {...register(
          "p_notes"
        )}
      />

      <button
        type="submit"
      >
        Pay Supplier
      </button>
    </form>
  );
}
import CartSection from "./CartSection";
import ProductSearch from "./ProductSearch";

export default function POSPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        POS Billing
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <ProductSearch />
        </div>

        <div>
          <CartSection />
        </div>

      </div>

    </div>
  );
}
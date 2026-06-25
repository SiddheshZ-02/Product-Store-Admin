import { create } from "zustand";

interface CartItem {
  product_id: string;
  name: string;
  selling_price: number;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: ( 
    productId: string
  ) => void;

  increaseQty: (
    productId: string
  ) => void;

  decreaseQty: (
    productId: string
  ) => void;

  clearCart: () => void;
}

export const useCartStore =
  create<CartStore>(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing =
            state.items.find(
              (i) =>
                i.product_id ===
                item.product_id
            );

        if (existing) {

  if (
    existing.quantity >=
    existing.stock
  ) {
    return state;
  }

  return {
    items:
      state.items.map(
        (i) =>
          i.product_id ===
          item.product_id
            ? {
                ...i,
                quantity:
                  i.quantity + 1,
              }
            : i
      ),
  };
}

          return {
            items: [
              ...state.items,
              item,
            ],
          };
        }),

      removeItem: (
        productId
      ) =>
        set((state) => ({
          items:
            state.items.filter(
              (i) =>
                i.product_id !==
                productId
            ),
        })),

    increaseQty: (
  productId
) =>
  set((state) => ({
    items:
      state.items.map(
        (item) => {

          if (
            item.product_id !==
            productId
          ) {
            return item;
          }

          if (
            item.quantity >=
            item.stock
          ) {
            return item;
          }

          return {
            ...item,
            quantity:
              item.quantity + 1,
          };
        }
      ),
  })),

      decreaseQty: (
        productId
      ) =>
        set((state) => ({
          items:
            state.items.map((i) =>
              i.product_id ===
              productId
                ? {
                    ...i,
                    quantity:
                      Math.max(
                        1,
                        i.quantity - 1
                      ),
                  }
                : i
            ),
        })),

      clearCart: () =>
        set({
          items: [],
        }),
    }),

  );
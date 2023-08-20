import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type CartItemType = {
  id: number,
  image: string,
  name: string,
  price: number,
  quantity: number,
  slug: string,
}

type StoreState = {
  cart: CartItemType[],
  searchInput: string
}

type Actions = {
  addCart: (cart: CartItemType) => void,
  incrementQuantity: (id: number) => void,
  decrementQuantity: (id: number) => void,
  deleteCart: (id: number) => void,
  resetCart: () => void,
}

const initalState: StoreState = {
  cart: [],
  searchInput: ''
}


export const store = create(persist<StoreState & Actions>((set, get) => ({
  ...initalState,
  addCart: (cartItem: CartItemType) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(item => item.id === cartItem.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { cart: updatedCart };
      } else {
        return { cart: [...state.cart, cartItem] };
      }
    }),
  incrementQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decrementQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
  deleteCart: (id) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),

  resetCart: () => set(() => ({ cart: [] }))

}),
  {
    name: 'cart',
    storage: createJSONStorage(() => localStorage),
  }
)

);
type CartItemType = {
    id: number
    image: string
    name: string
    price: number
    quantity: number
    slug: string
}

type CalculatReturn = {
    total: number;
    deliveryPrice: number;
}


export const calculateTotalCart = ({ cart, additionals = 0 }: { cart: CartItemType[], additionals?: number }): CalculatReturn => {
    const total = cart?.reduce((prev, next) => (prev + ((next.price * next.quantity)) + additionals), additionals)
    const deliveryPrice = additionals
    return {
        total,
        deliveryPrice
    }
}

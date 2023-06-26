export function calculateReducedPrice(originalPrice:number, reductionPercentage:number) {
    const reduction = (originalPrice * reductionPercentage) / 100;
    const reducedPrice = originalPrice - reduction;
    return reducedPrice;
}

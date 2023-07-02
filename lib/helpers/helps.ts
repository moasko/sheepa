export function calculateOriginalPrice(currentPrice: number, discountPercentage: number): number {
    const originalPrice: number = currentPrice / ((100 - discountPercentage) / 100);
    return originalPrice;
  }
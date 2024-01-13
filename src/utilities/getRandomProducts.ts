import { Product } from "@/definitions";

export function getRandomProducts<T extends Product>(
  arr: T[],
  currentProduct: T
): T[] {
  const randomProducts: T[] = [];
  const currentIndex = arr.findIndex(
    (product) => product.id === currentProduct.id
  );
  arr.splice(currentIndex, 1);
  while (randomProducts.length < 2) {
    const randomProduct = arr[Math.floor(Math.random() * arr.length)];
    if (randomProducts.every((product) => product.id !== randomProduct.id)) {
      randomProducts.push(randomProduct);
    }
  }
  return randomProducts;
}

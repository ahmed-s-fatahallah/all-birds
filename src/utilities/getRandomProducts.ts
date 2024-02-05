import { Product } from "@/definitions";

export function getRandomProducts(
  products: { [key: string]: Product },
  currentProduct: Product
): { [key: string]: Product }[] {
  const randomProducts: { [key: string]: Product }[] = [];
  // Get the products names in an array.
  const productsNames: string[] = [];
  // Get the products objects in an array.
  const productsData: Product[] = [];

  for (const [productName, productData] of Object.entries(products)) {
    if (productData.id === currentProduct.id) continue;
    productsNames.push(productName);
    productsData.push(productData);
  }

  while (randomProducts.length < 2) {
    // Get a random number
    const randomIndex = Math.floor(Math.random() * productsData.length);

    // Get random product
    const randomProduct = productsData[randomIndex];
    // Get random product name for the random product with the same random index
    const productName = productsNames[randomIndex];

    // Check for duplications if a duplicate is found then don't push it else push it to the final array
    if (
      randomProducts.every(
        (product) => Object.values(product)[0].id !== randomProduct.id
      )
    ) {
      randomProducts.push({ [productName]: randomProduct });
    }
  }
  return randomProducts;
}

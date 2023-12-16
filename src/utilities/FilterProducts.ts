import { Product, ProductData } from "@/definitions";

const filterProducts = (productsData: ProductData, filter?: string) => {
  let filteredProductsData: Product[] = [];
  let filteredProductsNames: string[] = [];

  for (const [name, product] of Object.entries<Product>(productsData).sort(
    (a, b) => a[1].id - b[1].id
  )) {
    if (!filter) {
      filteredProductsNames.push(name);
      filteredProductsData.push(product);
    } else {
      if (product.collection === filter) {
        filteredProductsNames.push(name);
        filteredProductsData.push(product);
      }
    }
  }

  return {
    filteredProductsData,
    filteredProductsNames,
  };
};

export default filterProducts;

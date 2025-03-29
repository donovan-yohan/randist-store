// repository functions
// const fetchProducts = (): Promise<FetchProductsResult> =>
//     client.fetch<ProductsQueryResult>(query);

import { sanityClient } from './client';
import { CartProductList, ProductDetail, ProductList } from './sanity.queries';
import { CartProductListResult, ProductDetailResult, ProductListResult } from './sanity.types';

//   const fetchDetailedProduct = (slug: string): Promise<FetchDetailedProductResult> => {
//     const result = client
//       .fetch<DetailedProductQueryResult>
//       (detailedProduct(), { slug });

//     return result ? {
//       ...result,
//       slug
//     } : null
//   }

export const fetchProductList = async (): Promise<ProductListResult> => {
  return sanityClient.fetch(ProductList);
};

export const fetchProductDetail = async (id: string): Promise<ProductDetailResult> => {
  return sanityClient.fetch(ProductDetail, { id });
};

export const fetchCartProductList = async (
  optionMap: Record<string, string>
): Promise<CartProductListResult> => {
  const productIds = Object.keys(optionMap);
  return sanityClient.fetch(CartProductList, { productIds, optionMap });
};

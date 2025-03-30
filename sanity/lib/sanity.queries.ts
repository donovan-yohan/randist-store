import { defineQuery } from 'next-sanity';

// query functions
// export const products = () => groq`
//   *[_type == "product"]{
//     name,
//     price,
//     "slug": slug.current,
//     "imageUrl": image.asset
//   }
// `

// export const detailedProduct = () => groq`
//   *[_type == "product" && slug.current == $slug][0]{
//     name,
//     price,
//     "imageUrl": image.asset,
//     description,
//     technicalSpecifications,
//     amountInStock
//   }
// `;
export const ProductList = defineQuery(`*[_type == "product"] | order(name asc)[0..100] {
    _id,
    name,
    price,
    "productImages": options[]{
      images[]{
        _key,
        asset->{
          _id,
          url
        }
      }
    }[0].images[0]
}`);

export const ProductListWithSearch = defineQuery(`*[_type == "product" && (
  name match $keywordsFuzzy || count(tags[@ in $keywords]) > 0
)] | order(name asc)[0..100] {
  _id,
  name,
  price,
  tags,
  "productImages": options[]{
    images[]{
      _key,
      asset->{
        _id,
        url
      }
    }
  }[0].images[0]
}`);

export const ProductDetail = defineQuery(`*[_type == "product" && _id == $id][0]`);

export const CartProductList =
  defineQuery(`*[_type == "product" && _id in $productIds] | order(name asc) {
  _id,
  name,
  price,
  "productImages": *[_type == "product" && _id == ^._id][0].options[ _key == $optionMap[^._id] ][0].images[0]{
    _key,
    asset->{
      _id,
      url
    }
  }
}`);

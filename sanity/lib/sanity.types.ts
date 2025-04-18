// Query TypeMap
import '@sanity/client';

/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch';
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: 'sanity.imagePalette';
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions';
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: 'sanity.fileAsset';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: 'geopoint';
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Slug = {
  _type: 'slug';
  current: string;
  source?: string;
};

export type Product = {
  _id: string;
  _type: 'product';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: 'span';
      _key: string;
    }>;
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
    listItem?: 'bullet' | 'number';
    markDefs?: Array<{
      href?: string;
      _type: 'link';
      _key: string;
    }>;
    level?: number;
    _type: 'block';
    _key: string;
  }>;
  price?: number;
  options?: Array<{
    name?: string;
    colour?: Color;
    images?: Array<{
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
      _key: string;
    }>;
    _key: string;
  }>;
  sizes?: Array<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'>;
  tags?: Array<string>;
};

export type SanityImageCrop = {
  _type: 'sanity.imageCrop';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot';
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: 'sanity.imageAsset';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData';
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata';
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Color = {
  _type: 'color';
  hex?: string;
  alpha?: number;
  hsl?: HslaColor;
  hsv?: HsvaColor;
  rgb?: RgbaColor;
};

export type RgbaColor = {
  _type: 'rgbaColor';
  r?: number;
  g?: number;
  b?: number;
  a?: number;
};

export type HsvaColor = {
  _type: 'hsvaColor';
  h?: number;
  s?: number;
  v?: number;
  a?: number;
};

export type HslaColor = {
  _type: 'hslaColor';
  h?: number;
  s?: number;
  l?: number;
  a?: number;
};

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Slug
  | Product
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | Color
  | RgbaColor
  | HsvaColor
  | HslaColor;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/lib/sanity.queries.ts
// Variable: ProductList
// Query: *[_type == "product"] | order(name asc)[0..100] {    _id,    name,    price,    "productImages": options[]{      images[]{        _key,        asset->{          _id,          url        }      }    }[0].images[0]}
export type ProductListResult = Array<{
  _id: string;
  name: string;
  price: number | undefined;
  productImages: {
    _key: string;
    asset: {
      _id: string;
      url: string | undefined;
    } | undefined;
  } | undefined;
}>;
// Variable: ProductListWithSearch
// Query: *[_type == "product" && (  name match $keywordsFuzzy || count(tags[@ in $keywords]) > 0)] | order(name asc)[0..100] {  _id,  name,  price,  tags,  "productImages": options[]{    images[]{      _key,      asset->{        _id,        url      }    }  }[0].images[0]}
export type ProductListWithSearchResult = Array<{
  _id: string;
  name: string;
  price: number | undefined;
  tags: Array<string> | undefined;
  productImages: {
    _key: string;
    asset: {
      _id: string;
      url: string | undefined;
    } | undefined;
  } | undefined;
}>;
// Variable: ProductDetail
// Query: *[_type == "product" && _id == $id][0]
export type ProductDetailResult = {
  _id: string;
  _type: 'product';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: 'span';
      _key: string;
    }>;
    style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal';
    listItem?: 'bullet' | 'number';
    markDefs?: Array<{
      href?: string;
      _type: 'link';
      _key: string;
    }>;
    level?: number;
    _type: 'block';
    _key: string;
  }>;
  price?: number;
  options?: Array<{
    name?: string;
    colour?: Color;
    images?: Array<{
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
      _key: string;
    }>;
    _key: string;
  }>;
  sizes?: Array<'large' | 'medium' | 'small' | 'xlarge' | 'xsmall' | 'xxlarge' | 'xxxlarge'>;
  tags?: Array<string>;
} | undefined;
// Variable: CartProductList
// Query: *[_type == "product" && _id in $productIds] | order(name asc) {  _id,  name,  price,  "productImages": *[_type == "product" && _id == ^._id][0].options[ _key == $optionMap[^._id] ][0].images[0]{    _key,    asset->{      _id,      url    }  }}
export type CartProductListResult = Array<{
  _id: string;
  name: string;
  price: number | undefined;
  productImages: null;
}>;

declare module '@sanity/client' {
  interface SanityQueries {
    '*[_type == "product"] | order(name asc)[0..100] {\n    _id,\n    name,\n    price,\n    "productImages": options[]{\n      images[]{\n        _key,\n        asset->{\n          _id,\n          url\n        }\n      }\n    }[0].images[0]\n}': ProductListResult;
    '*[_type == "product" && (\n  name match $keywordsFuzzy || count(tags[@ in $keywords]) > 0\n)] | order(name asc)[0..100] {\n  _id,\n  name,\n  price,\n  tags,\n  "productImages": options[]{\n    images[]{\n      _key,\n      asset->{\n        _id,\n        url\n      }\n    }\n  }[0].images[0]\n}': ProductListWithSearchResult;
    '*[_type == "product" && _id == $id][0]': ProductDetailResult;
    '*[_type == "product" && _id in $productIds] | order(name asc) {\n  _id,\n  name,\n  price,\n  "productImages": *[_type == "product" && _id == ^._id][0].options[ _key == $optionMap[^._id] ][0].images[0]{\n    _key,\n    asset->{\n      _id,\n      url\n    }\n  }\n}': CartProductListResult;
  }
}

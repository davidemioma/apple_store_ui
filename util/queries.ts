import { groq } from "next-sanity";

export const categoryQuery = groq`*[_type == "category"]{
  _id,
  slug,
  title,
}`;

export const productQuery = groq`*[_type == "product"] | order(_createdAt asc){
  _id,
  title,
  price,
  slug,
  image,
  category->{
    _id,
    slug,
    title,
  }
}`;

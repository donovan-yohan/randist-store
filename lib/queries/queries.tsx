import { fetchProductDetail, fetchProductList } from "@/sanity/lib/sanity.repository"
import { queryOptions } from "@tanstack/react-query"

export const productListOptions = queryOptions({
    queryKey: ["products"],
    queryFn: fetchProductList,
})

export const productDetailOptions = (id: string) =>
    queryOptions({
        queryKey: ["products", id],
        queryFn: () => fetchProductDetail(id),
    })


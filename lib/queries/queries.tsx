import { fetchProductDetail, fetchProductList } from "@/sanity/lib/sanity.repository"
import { MutationOptions, queryOptions } from "@tanstack/react-query"
import { InvoiceEmailProps } from "../emails/InvoiceEmail"

export const productListOptions = (search?: string) => queryOptions({
    queryKey: ["products", search],
    queryFn: () => fetchProductList(search),
})

export const productDetailOptions = (id: string) =>
    queryOptions({
        queryKey: ["products", id],
        queryFn: () => fetchProductDetail(id),
    })

export const sendEmailOptions: MutationOptions<unknown, Error, InvoiceEmailProps> = {
    mutationFn: async (data: InvoiceEmailProps) => {
        const response = await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error("Failed to send email")
        }

        return response.json()
    },
}


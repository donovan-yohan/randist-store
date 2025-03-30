import { RandistAppShell } from "@/components/RandistAppShell/RandistAppShell"
import { Suspense } from "react"

export default function StoreLayout({ children }: { children: any }) {
    return <Suspense><RandistAppShell>{children}</RandistAppShell></Suspense>
}
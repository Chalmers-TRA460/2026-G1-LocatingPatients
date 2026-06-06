"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/lib/base-ui/tabs"

const views = [
  { label: "Presentation", href: "/" },
  { label: "Planning", href: "/planning" },
] as const

export function ViewToggle() {
  const pathname = usePathname()
  const value = pathname.startsWith("/planning") ? "/planning" : "/"

  return (
    <Tabs value={value}>
      <TabsList>
        {views.map(({ label, href }) => (
          <TabsTrigger key={href} value={href} asChild>
            <Link href={href}>{label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

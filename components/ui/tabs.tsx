"use client"

import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

const TabsContext = createContext<{
  value: string
  onValueChange: (v: string) => void
}>({ value: "", onValueChange: () => {} })

export function Tabs({
                       value,
                       onValueChange,
                       children,
                       className,
                     }: {
  value: string
  onValueChange: (v: string) => void
  children: React.ReactNode
  className?: string
}) {
  return (
      <TabsContext.Provider value={{ value, onValueChange }}>
        <div className={cn("w-full", className)}>{children}</div>
      </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
      <div className={cn("flex gap-1 p-1 bg-[#F5F5F5] rounded-[12px]", className)}>
        {children}
      </div>
  )
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)
  const isActive = ctx.value === value

  return (
      <button
          onClick={() => ctx.onValueChange(value)}
          className={cn(
              "px-5 py-2 rounded-[10px] text-[15px] font-medium transition-all duration-200",
              isActive
                  ? "bg-white text-[#51A46B] shadow-sm font-bold"
                  : "text-[#505050] hover:text-[#212121]",
              className
          )}
      >
        {children}
      </button>
  )
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)
  if (ctx.value !== value) return null
  return <>{children}</>
}
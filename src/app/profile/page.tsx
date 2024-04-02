"use client"

import { useRouter } from "next/navigation"

import { Stats } from "@/components/widgets/stats"

export default function ProfilePage() {
  const router = useRouter()
  return (
    <Stats onBack={() => router.push('/')} />
  )
}

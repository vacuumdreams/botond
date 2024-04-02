"use client"

import { useRouter } from 'next/navigation'

import { Intro } from "@/components/widgets/intro"
import { Dialogue } from "@/components/widgets/dialogue"

export const Screen = () => {
  const router = useRouter()
  return (
    <div>
      <div>
        <div>
          <Intro startTransition={false} />
        </div>
      </div>
      <article className="container">
        <Dialogue setStatsOpen={() => router.push('/profile')} />
      </article>
    </div>
  )
}

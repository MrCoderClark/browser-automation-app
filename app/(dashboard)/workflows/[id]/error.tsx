"use client"

import { RotateCcw, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlert />
        </EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>
          {error.message || "We couldn't load this workflow. Please try again."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={reset}>
          <RotateCcw />
          Try again
        </Button>
      </EmptyContent>
    </Empty>
  )
}

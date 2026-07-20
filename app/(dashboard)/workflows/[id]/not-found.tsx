import Link from "next/link"
import { SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>Workflow not found</EmptyTitle>
        <EmptyDescription>
          This workflow doesn&apos;t exist or you don&apos;t have access to it.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/">Back to dashboard</Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}

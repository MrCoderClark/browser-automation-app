"use client"

import React from "react"
import { PlayIcon } from "lucide-react"
import { useRealtimeRun } from "@trigger.dev/react-hooks"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import type { helloWorldTask } from "@/trigger/example"
import { runWorkflowAction } from "../actions"

type RunHandle = { id: string; publicAccessToken: string }

export function RightSidebar() {
  const [isPending, startTransition] = React.useTransition()
  const [handle, setHandle] = React.useState<RunHandle | null>(null)

  const handleRun = () => {
    startTransition(async () => {
      const next = await runWorkflowAction()
      setHandle(next)
    })
  }

  return (
    <div className="flex size-full flex-col gap-3 p-2">
      <Button onClick={handleRun} disabled={isPending}>
        <PlayIcon />
        Run
      </Button>
      {handle && <RunFeedback key={handle.id} {...handle} />}
    </div>
  )
}

function RunFeedback({ id, publicAccessToken }: RunHandle) {
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(id, {
    accessToken: publicAccessToken,
    skipColumns: ["payload"],
  })

  if (error) {
    return (
      <div className="rounded-md border border-destructive/40 bg-destructive/10 p-2 text-xs text-destructive">
        {error.message}
      </div>
    )
  }

  if (!run) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Spinner className="size-3" />
        Connecting…
      </div>
    )
  }

  const isRunning = !run.finishedAt

  return (
    <div className="flex flex-col gap-2 rounded-md border p-2 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-medium">Run</span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {isRunning && <Spinner className="size-3" />}
          {run.status}
        </span>
      </div>
      {run.output?.message && (
        <div className="text-muted-foreground">{run.output.message}</div>
      )}
      {run.error && (
        <div className="text-destructive">{run.error.message}</div>
      )}
    </div>
  )
}

export default RightSidebar

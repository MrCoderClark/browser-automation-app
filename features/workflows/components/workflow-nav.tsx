"use client"

import { SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, useSidebar } from "@/components/ui/sidebar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { PlusIcon, WorkflowIcon } from "lucide-react"
import type { Workflow } from "@/lib/db/schema"
import React from "react"
import { generateSlug } from "../lib/generate-slug"

interface WorkflowNavProps {
    workflows: Workflow[]
    onCreateWorkflow: (name: string) => Promise<void>
}


export function WorkflowNav({ workflows, onCreateWorkflow }: WorkflowNavProps) {
    const { state } = useSidebar()
    const [isPending, startTransition] = React.useTransition()

    const handleCreateWorkflow = () => {
        startTransition(async () => {
            await onCreateWorkflow(generateSlug())
        })
    }

    const workflowItems = workflows.map((workflow) => (
        <SidebarMenuItem key={workflow.id}>
            <SidebarMenuButton>
                <span>{workflow.name}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    ))


    if (state === "collapsed") {
        return (
            <SidebarGroup>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <SidebarMenuButton tooltip="Workflows">
                                        <WorkflowIcon />
                                        <span>Workflows</span>
                                    </SidebarMenuButton>
                                </PopoverTrigger>
                                <PopoverContent side="right" align="start" className="p-1">
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                onClick={handleCreateWorkflow}
                                                disabled={isPending}
                                            >
                                                <PlusIcon />
                                                <span>New workflow</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                    <SidebarSeparator className="mx-0" />
                                    <SidebarMenu className="gap-y-0.5">{workflowItems}</SidebarMenu>
                                </PopoverContent>
                            </Popover>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
            </SidebarGroup>
        )
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Workflows</SidebarGroupLabel>
            <SidebarGroupAction
                title="New workflow"
                onClick={handleCreateWorkflow}
                disabled={isPending}
            >
                <PlusIcon />
                <span className="sr-only">New workflow</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
                <SidebarMenu className="gap-y-0.5">{workflowItems}</SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default WorkflowNav

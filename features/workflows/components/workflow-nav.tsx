"use client"

import React from "react"
import { SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, useSidebar } from "@/components/ui/sidebar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { PlusIcon, WorkflowIcon } from "lucide-react"


const workflows = [
    "dominant-wasp",
    "honest-reindeer",
    "expected-llama",
    "essential-ocelot",
    "creepy-echidna",
    "eastern-silkworm",
    "cultural-lion",
    "proud-weasel",
    "regional-bonobo",
]

export default function WorkflowNav() {
    const { state } = useSidebar()
    const [activeWorkflow, setActiveWorkflow] = React.useState(workflows[0])

    const workflowItems = workflows.map((workflow) => (
        <SidebarMenuItem key={workflow}>
            <SidebarMenuButton
                isActive={workflow === activeWorkflow}
                onClick={() => setActiveWorkflow(workflow)}
            >
                <span>{workflow}</span>
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
                                        <span>{activeWorkflow}</span>
                                    </SidebarMenuButton>
                                </PopoverTrigger>
                                <PopoverContent side="right" align="start" className="p-1">
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
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
            <SidebarGroupAction title="New workflow">
                <PlusIcon />
                <span className="sr-only">New workflow</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
                <SidebarMenu className="gap-y-0.5">{workflowItems}</SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

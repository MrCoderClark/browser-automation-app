"use client"

import { useCallback, useState } from "react"
import { useTheme } from "next-themes"
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlow,
  ConnectionLineType,
  type ColorMode,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  NodeTypes,
} from "@xyflow/react"

import { StepNode } from "@/features/workflows/components/step-node"
import type { StepNodeType } from "@/features/workflows/nodes/node-registry"

import "@xyflow/react/dist/style.css"

const nodeTypes: NodeTypes = { step: StepNode }

const initialNodes: StepNodeType[] = [
  {
    id: "start",
    type: "step",
    position: { x: 0, y: 0 },
    data: { type: "start", kind: "trigger", title: "Start", values: {} },
  }
]

const initialEdges: Edge[] = [{ id: "n1-n2", source: "n1", target: "n2" }]

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const colorMode = (resolvedTheme === "dark" ? "dark" : "light") satisfies ColorMode

  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((ns) => applyNodeChanges(changes, ns)),
    [],
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((es) => applyEdgeChanges(changes, es)),
    [],
  )

  const onConnect = useCallback(
    (params: Connection) => setEdges((es) => addEdge(params, es)),
    [],
  )

  return (
    <div className="size-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode={colorMode}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "var(--border)" },
        }}
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionLine-stroke-width": 2,
          } as React.CSSProperties
        }
        maxZoom={1}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Canvas

import { useState } from "react";
import type { WorkflowNode, NodeType } from "../types/workflow";
import WorkflowNodeUI from "./WorkflowNode";
import { createNode, deleteNode } from "../utils/workflowHelpers";

export default function WorkflowCanvas() {
  const startNode: WorkflowNode = {
    id: "start",
    type: "START",
    label: "Start",
    children: [],
  };

  const [nodes, setNodes] = useState<Record<string, WorkflowNode>>({
    start: startNode,
  });

  const addNode = (
    parentId: string,
    type: NodeType,
    branch?: "true" | "false"
  ) => {
    setNodes((prev) => {
      const parent = prev[parentId];
      const newNode = createNode(type);

      let updatedParent = parent;

      if (parent.type === "BRANCH" && branch) {
        updatedParent = {
          ...parent,
          children: {
            ...(parent.children as any),
            [branch]: [
              ...(parent.children as any)[branch],
              newNode.id,
            ],
          },
        };
      } else {
        updatedParent = {
          ...parent,
          children: [...(parent.children as string[]), newNode.id],
        };
      }

      return {
        ...prev,
        [newNode.id]: newNode,
        [parentId]: updatedParent,
      };
    });
  };

  const removeNode = (id: string) => {
    setNodes((prev) => deleteNode(prev, id));
  };

  const editNode = (id: string, label: string) => {
    setNodes((prev) => ({
      ...prev,
      [id]: { ...prev[id], label },
    }));
  };

  const saveWorkflow = () => {
    console.log("WORKFLOW JSON:", nodes);
  };

  return (
    <>
      <button className="save-btn" onClick={saveWorkflow}>
        💾 Save Workflow
      </button>

      <WorkflowNodeUI
        node={nodes.start}
        nodes={nodes}
        onAdd={addNode}
        onDelete={removeNode}
        onEdit={editNode}
      />
    </>
  );
}

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

  const addNode = (parentId: string, type: NodeType) => {
    setNodes((prev) => {
      const newNode = createNode(type);
      return {
        ...prev,
        [newNode.id]: newNode,
        [parentId]: {
          ...prev[parentId],
          children: [...prev[parentId].children, newNode.id],
        },
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

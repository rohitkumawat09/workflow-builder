import type { WorkflowNode, NodeType } from "../types/workflow";

export const createNode = (type: NodeType): WorkflowNode => ({
  id: crypto.randomUUID(),
  type,
  label:
    type === "START"
      ? "Start"
      : type === "BRANCH"
      ? "Condition"
      : type === "END"
      ? "End"
      : "Action",
  children: [],
});

export const deleteNode = (
  nodes: Record<string, WorkflowNode>,
  nodeId: string
) => {
  const updated = { ...nodes };
  const deleted = updated[nodeId];
  if (!deleted) return updated;

  Object.values(updated).forEach((node) => {
    node.children = node.children.flatMap((id) =>
      id === nodeId ? deleted.children : id
    );
  });

  delete updated[nodeId];
  return updated;
};

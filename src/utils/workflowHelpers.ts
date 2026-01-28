import type { WorkflowNode, NodeType, BranchChildren } from "../types/workflow";

export const createNode = (type: NodeType): WorkflowNode => {
  if (type === "BRANCH") {
    return {
      id: crypto.randomUUID(),
      type,
      label: "Condition",
      children: {
        true: [],
        false: [],
      },
    };
  }

  return {
    id: crypto.randomUUID(),
    type,
    label:
      type === "START"
        ? "Start"
        : type === "END"
        ? "End"
        : "Action",
    children: [],
  };
};

export const deleteNode = (
  nodes: Record<string, WorkflowNode>,
  nodeId: string
) => {
  const updated = structuredClone(nodes);
  const deleted = updated[nodeId];
  if (!deleted) return updated;

  Object.values(updated).forEach((node) => {
    if (node.type === "BRANCH") {
      const children = node.children as BranchChildren;

      children.true = children.true.flatMap((id) =>
        id === nodeId
          ? Array.isArray(deleted.children)
            ? deleted.children
            : [...deleted.children.true, ...deleted.children.false]
          : id
      );

      children.false = children.false.flatMap((id) =>
        id === nodeId
          ? Array.isArray(deleted.children)
            ? deleted.children
            : [...deleted.children.true, ...deleted.children.false]
          : id
      );
    } else {
      node.children = (node.children as string[]).flatMap((id) =>
        id === nodeId
          ? Array.isArray(deleted.children)
            ? deleted.children
            : [...deleted.children.true, ...deleted.children.false]
          : id
      );
    }
  });

  delete updated[nodeId];
  return updated;
};

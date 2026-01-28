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
  if (!updated[nodeId]) return updated;

  const toDelete = new Set<string>();

  const collect = (id: string) => {
    if (!updated[id] || toDelete.has(id)) return;
    toDelete.add(id);
    const node = updated[id];
    if (node.type === "BRANCH") {
      const children = node.children as BranchChildren;
      children.true.forEach(collect);
      children.false.forEach(collect);
    } else {
      (node.children as string[]).forEach(collect);
    }
  };

  collect(nodeId);

  // Remove references to any deleted ids from remaining nodes
  Object.values(updated).forEach((node) => {
    if (node.type === "BRANCH") {
      const children = node.children as BranchChildren;
      children.true = children.true.filter((id) => !toDelete.has(id));
      children.false = children.false.filter((id) => !toDelete.has(id));
    } else {
      node.children = (node.children as string[]).filter(
        (id) => !toDelete.has(id)
      );
    }
  });

  toDelete.forEach((id) => delete updated[id]);
  return updated;
};

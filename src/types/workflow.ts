export type NodeType = "START" | "ACTION" | "BRANCH" | "END";

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  children: string[];
}

export type NodeType = "START" | "ACTION" | "BRANCH" | "END";

export type BranchChildren = {
  true: string[];
  false: string[];
};

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  children: string[] | BranchChildren;
}

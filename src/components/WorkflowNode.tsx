import type { WorkflowNode } from "../types/workflow";
import AddNodeMenu from "./AddNodeMenu";
import { FaTrash } from "react-icons/fa";

type Node = WorkflowNode;

interface Props {
  node: Node;
  nodes: Record<string, Node>;
  onAdd: (parentId: string, type: any) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, label: string) => void;
}

export default function WorkflowNode({
  node,
  nodes,
  onAdd,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="node" data-type={node.type}>
      <div className="node-header">
        <input
          value={node.label}
          onChange={(e) => onEdit(node.id, e.target.value)}
        />

        {node.type !== "START" && (
          <button className="delete" onClick={() => onDelete(node.id)}>
            <FaTrash />
          </button>
        )}
      </div>

      {node.type !== "END" && (
        <AddNodeMenu onAdd={(type) => onAdd(node.id, type)} />
      )}

      <div className="children">
        {node.children.map((childId) => (
          <WorkflowNode
            key={childId}
            node={nodes[childId]}
            nodes={nodes}
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

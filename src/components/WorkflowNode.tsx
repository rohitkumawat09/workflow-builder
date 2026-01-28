import type { WorkflowNode, BranchChildren } from "../types/workflow";
import AddNodeMenu from "./AddNodeMenu";
import { FaTrash } from "react-icons/fa";

interface Props {
  node: WorkflowNode;
  nodes: Record<string, WorkflowNode>;
  onAdd: (parentId: string, type: any, branch?: "true" | "false") => void;
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
    <div className={`node ${node.type.toLowerCase()}`}>
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
        <AddNodeMenu
          isBranch={node.type === "BRANCH"}
          onAdd={(type, branch) => onAdd(node.id, type, branch)}
        />
      )}

      {node.type === "BRANCH" ? (
        <div className="branch">
          {(["true", "false"] as const).map((key) => (
            <div key={key} className="branch-column">
              <strong>{key.toUpperCase()}</strong>
              {(node.children as BranchChildren)[key].map((id) => (
                <WorkflowNode
                  key={id}
                  node={nodes[id]}
                  nodes={nodes}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="children">
          {(node.children as string[]).map((id) => (
            <WorkflowNode
              key={id}
              node={nodes[id]}
              nodes={nodes}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

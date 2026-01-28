import { FaPlus, FaCodeBranch, FaFlagCheckered } from "react-icons/fa";
import type { NodeType } from "../types/workflow";

interface Props {
  isBranch?: boolean;
  onAdd: (type: NodeType, branch?: "true" | "false") => void;
}

export default function AddNodeMenu({ isBranch, onAdd }: Props) {
  if (isBranch) {
    return (
      <div className="add-menu">
        <button onClick={() => onAdd("ACTION", "true")}>
          <FaPlus /> True
        </button>
        <button onClick={() => onAdd("ACTION", "false")}>
          <FaPlus /> False
        </button>
      </div>
    );
  }

  return (
    <div className="add-menu">
      <button onClick={() => onAdd("ACTION")}>
        <FaPlus /> Action
      </button>
      <button onClick={() => onAdd("BRANCH")}>
        <FaCodeBranch /> Branch
      </button>
      <button onClick={() => onAdd("END")}>
        <FaFlagCheckered /> End
      </button>
    </div>
  );
}

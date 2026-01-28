import { FaPlus, FaCodeBranch, FaFlagCheckered } from "react-icons/fa";
import type { NodeType } from "../types/workflow";

interface Props {
  onAdd: (type: NodeType) => void;
}

export default function AddNodeMenu({ onAdd }: Props) {
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

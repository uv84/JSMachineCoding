import { useContext, useState } from "react";
import { FileExplorerContext } from "./context/FileExplorerContext";
import Input from "./Input";

export default function FileExp({ id = 1 }) {
  const [showChildren, setShowChildren] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const { nodes, deleteNode, addNode, editNode } =
    useContext(FileExplorerContext);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  console.log(nodes);
  return (
    <div className="container">
      <h5>
        {nodes[id].type === "folder" ? (showChildren ? "📂" : "📁") : "📄"}

        {showEditInput ? (
          <Input
            name={nodes[id].name}
            cancel={() => setShowEditInput(false)}
            id={id}
            submit={editNode}
          />
        ) : (
          <>
            <span onClick={handleClick}>{nodes[id].name}</span>

            {nodes[id].type === "folder" && (
              <span onClick={() => setShowAddInput(true)}>➕</span>
            )}
            <span onClick={() => setShowEditInput(true)}>🖊️</span>
            <span onClick={() => deleteNode(id)}>❌</span>
          </>
        )}
      </h5>
      <>
        {showAddInput && (
          <Input
            submit={addNode}
            id={id}
            cancel={() => setShowAddInput(false)}
          />
        )}
      </>
      {showChildren &&
        nodes[id]?.children?.map((childId, index) => {
          return <FileExplorer key={index} id={childId} />;
        })}
    </div>
  );
}

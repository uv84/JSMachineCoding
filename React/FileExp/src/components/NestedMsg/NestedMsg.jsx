import React, { useContext, useState } from "react";
import Data from "./Data/data";
import { MsgContext } from "./Context/MsgContex";
import Input from "../Input";

function NestedMsg({ id = 1 }) {
  const [isChildren, setChildren] = useState(true);
  const [showAddInput, setShowAddInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const { nodes, addNode, editNode,deleteNode } = useContext(MsgContext);
  return (
    <div className="container">
      <h5>
        {showEditInput ? (
                  <Input
                    name={nodes[id].name}
                    cancel={() => setShowEditInput(false)}
                    id={id}
                    submit={editNode}
                  />
                ) : (
                  <>
                    <span onClick={()=>setChildren(!isChildren)}>{nodes[id].name}</span>
        
                   
                      <span onClick={() => setShowAddInput(true)}>➕</span>
             
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
      {isChildren && (
        <div>
          {nodes[id]?.children?.map((value) => (
            <NestedMsg id={value} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NestedMsg;

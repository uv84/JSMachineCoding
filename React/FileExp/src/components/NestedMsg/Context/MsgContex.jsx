import React, { createContext, useState } from "react";
import Data from "../Data/data";

export const MsgContext = createContext();

export default function MsgContexWrapper({ children }) {
  const [nodes, setNodes] = useState(Data);

  const addNode = (parentId, value) => {
    const newId = Date.now();
    console.log(newId);

    const newData = {
      id: newId,
      name: value,
      parentId: parentId,
      children: [],
    };
    const updatedNodes = { ...nodes, [newId]: newData };
    updatedNodes[parentId].children.unshift(newId);
    setNodes(updatedNodes);
    console.log(nodes);
  };

  const editNode = (id, value) => {
    const updatedNodes = { ...nodes };
    updatedNodes[id].name = value;
    setNodes(updatedNodes);
  };
  const deleteNode = (id) => {
    const updatedNodes = { ...nodes };
    const parentId = updatedNodes[id].parentId;
    if (parentId) {
      updatedNodes[parentId].children = updatedNodes[parentId].children.filter(
        (childId) => {
          return childId !== id;
        }
      );
    }
    const queue = [id];
    while (queue.length > 0) {
      const currentId = queue.shift();
      if (nodes[currentId].children) queue.push(...nodes[currentId].children);
      delete updatedNodes[currentId];
    }
    setNodes(updatedNodes);
  };

  return (
    <MsgContext.Provider value={{ nodes, addNode, editNode,deleteNode }}>
      {children}
    </MsgContext.Provider>
  );
}

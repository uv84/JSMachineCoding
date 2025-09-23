import { createContext, useState } from "react";

import data from "../Data/data";

interface NodeType {
  id: number;
  name: string;
  parentId?: number;
  type: string;
  children?: number[];
  [key: string]: any;
}

interface FileExplorerContextType {
  nodes: { [key: number]: NodeType };
  addNode: (parentId: number, value: string) => void;
  editNode: (id: number, value: string) => void;
  deleteNode: (id: number) => void;
}

export const FileExplorerContext = createContext<FileExplorerContextType | undefined>(undefined);

interface FileExplorerContextWrapperProps {
  children: React.ReactNode;
}

export default function FileExplorerContextWrapper({ children }: FileExplorerContextWrapperProps) {
  // Fix: ensure initial data matches NodeType, especially parentId type
  const [nodes, setNodes] = useState<{ [key: number]: NodeType }>(() => {
    // Convert any null parentId to undefined for type compatibility
    const fixedData: { [key: number]: NodeType } = {};
    Object.keys(data).forEach((keyStr) => {
      const key = Number(keyStr);
      const node = data[key as keyof typeof data];
      fixedData[key] = {
        ...node,
        parentId: node.parentId === null ? undefined : node.parentId,
      };
    });
    return fixedData;
  });

  const addNode = (parentId: number, value: string) => {
    const newId = Date.now();
    const newData: NodeType = {
      id: newId, name: value, parentId: parentId,
      type: ""
    };
    const isFolder = value.split(".");
    if (isFolder.length > 1) {
      //it is a file
      newData.type = "file";
    } else {
      //it is a folder
      newData.type = "folder";
      newData.children = [];
    }
    const updatedNodes = { ...nodes, [newId]: newData };
    console.log(updatedNodes);
    if (updatedNodes[parentId]?.children) {
      updatedNodes[parentId].children.unshift(newId);
    }
    setNodes(updatedNodes);
  };

  const editNode = (id: number, value: string) => {
    const updatedNodes = { ...nodes };
    updatedNodes[id].name = value;
    setNodes(updatedNodes);
  };

  const deleteNode = (id) => {
    const updatedNodes = { ...nodes };
    const parentId = updatedNodes[id].parentId;
    if (parentId !== undefined && updatedNodes[parentId]?.children) {
      updatedNodes[parentId].children = updatedNodes[parentId].children.filter(
        (childId) => childId !== id
      );
    }
    }
    const queue = [id];
    while (queue.length > 0) {
      const currentId = queue.shift();
      if (currentId !== undefined) {
        if (updatedNodes[currentId] && updatedNodes[currentId].children) {
          queue.push(...updatedNodes[currentId].children);
        }
        delete updatedNodes[currentId];
      }

  return (
    <FileExplorerContext.Provider
      value={{ nodes, deleteNode, addNode, editNode }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
}

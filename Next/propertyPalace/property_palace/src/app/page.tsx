"use client";

import { useState, useRef } from "react";

const initialContainer = {
  Tasks: ["Next.js", "PostGre", "Node.js"],
  Pending: ["react", "javascript", "TypeScript"],
  Completed: ["HTML", "CSS"],
};

export default function Home() {
  const [container, setContainer] = useState(initialContainer);
  const draggedItem = useRef<string | null>(null);
  const draggedFrom = useRef<string | null>(null);

  function handleDragStart(item: string, category: string) {
    draggedItem.current = item;
    draggedFrom.current = category;            
    
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent, targetCategory: string) {
    e.preventDefault();
    
    if (!draggedItem.current || !draggedFrom.current) return;
    
    const item = draggedItem.current;
    const sourceCategory = draggedFrom.current;
    
    if (sourceCategory === targetCategory) return;
    
    setContainer(prev => {
      const newContainer = { ...prev };
      console.log(newContainer["Tasks"]);
      
      // Remove item from source category
      newContainer[sourceCategory as keyof typeof newContainer] = 
        newContainer[sourceCategory as keyof typeof newContainer].filter(i => i !== item);
      
      // Add item to target category
      newContainer[targetCategory as keyof typeof newContainer] = 
        [...newContainer[targetCategory as keyof typeof newContainer], item];
      
      return newContainer;
    });
    
    // Reset drag state
    draggedItem.current = null;
    draggedFrom.current = null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drag and Drop</h1>
      <div className="flex gap-4">
        {Object.keys(container).map((category, index) => (
          <div 
            key={index}
            className="border-2 border-gray-300 rounded-lg p-4 min-h-[200px] w-64"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
          >
            <div className="mb-4 p-2 bg-gray-100 rounded text-center font-semibold">
              {category}
            </div>
            <div className="flex flex-col gap-2">
              {(container as any)[category].map((value: string) => (
                <div
                  key={value}
                  onDragStart={() => handleDragStart(value, category)}
                  draggable
                  className="p-2 bg-blue-100 rounded cursor-move hover:bg-blue-200 transition-colors"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

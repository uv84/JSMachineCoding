import React, { useRef, useState } from 'react'
interface DragAndDropProps {
  initialState: {
    Todo: string[];
    "In Progress": string[];
    Completed: string[];
  };
}

function DragAndDrop({ initialState }: DragAndDropProps) {
    const [state, setState] = useState(initialState);
    const taskData = useRef<unknown>(null);
    const containerData = useRef<unknown>(null);

    function DragStart(
      e: React.DragEvent<HTMLDivElement>,
      container: unknown,
      task: unknown
    ) {
      (e.target as HTMLDivElement).style.opacity = "0.5";
      taskData.current = task;
      containerData.current = container;
    }

    function DragEnd(
      e: React.DragEvent<HTMLDivElement>
    ) {
      (e.target as HTMLDivElement).style.opacity = "1";
    }

    function onHandle (
      targetContainer: unknown,
    ) {
      const item = taskData.current as string;
      const sourceContainer = containerData.current as keyof typeof state;
      setState((prevState) => {
        const newData= {...prevState};

        newData[sourceContainer as keyof typeof state]= newData[sourceContainer as keyof typeof state].filter((i) => i!== item);
        newData[targetContainer as keyof typeof state] = [...newData[targetContainer as keyof typeof state], item];
        return newData;
      })}

      function handleOver(  e: React.DragEvent<HTMLDivElement>){
        e.preventDefault();
      }

    
  return (
    <div>
        <h1>Drag and Drop Task Manager</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {Object.keys(state).map((container) => (
            <div key={container}
            onDrop={()=>onHandle( container)}
            onDragOver={(e) => handleOver(e)}
             style={{  border: '1px solid black', padding: '10px', width: '30%' }
             }>
                <h2>{container}</h2>
                
                {state[container as keyof typeof state].map((task, index) => (
                <div key={index}
                draggable
                onDragStart={(e) => DragStart(e, container, task)}
                onDragEnd={(e) => DragEnd(e)}
                 style={{ border: '1px solid gray', margin: '5px', padding: '5px', cursor: 'move' }
                 }>
                    {task}
                </div>
                ))}
            </div>
            ))}
        </div>
      
    </div>
  )
}

export default DragAndDrop

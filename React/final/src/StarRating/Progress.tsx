

import { useState } from 'react';

interface ProgressProps {
  value?: number;
  max?: number;
  showPercentage?: boolean;
  color?: string;
  height?: string;
}

function Progress({ 
  value = 0, 
  max = 100, 
  showPercentage = true, 
  color = "#4caf50",
  height = "20px" 
}: ProgressProps) {
  const [progress, setProgress] = useState(value);
  
  const percentage = Math.min(Math.max((progress / max) * 100, 0), 100);
  
  const incrementProgress = () => {
    setProgress(prev => Math.min(prev + 10, max));
  };
  
  const decrementProgress = () => {
    setProgress(prev => Math.max(prev - 10, 0));
  };
  
  const resetProgress = () => {
    setProgress(0);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>Progress Bar</h2>
      
      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: height,
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '10px',
        position: 'relative'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '10px',
          transition: 'width 0.3s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {showPercentage && percentage > 15 && (
            <span style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
        
        {/* Show percentage outside if bar is too small */}
        {showPercentage && percentage <= 15 && (
          <span style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#666'
          }}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      
      {/* Progress Info */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#666',
        marginBottom: '20px'
      }}>
        <span>{progress} / {max}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={decrementProgress}
          disabled={progress <= 0}
          style={{
            padding: '8px 16px',
            backgroundColor: progress <= 0 ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: progress <= 0 ? 'not-allowed' : 'pointer'
          }}
        >
          -10
        </button>
        
        <button 
          onClick={incrementProgress}
          disabled={progress >= max}
          style={{
            padding: '8px 16px',
            backgroundColor: progress >= max ? '#ccc' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: progress >= max ? 'not-allowed' : 'pointer'
          }}
        >
          +10
        </button>
        
        <button 
          onClick={resetProgress}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Progress;
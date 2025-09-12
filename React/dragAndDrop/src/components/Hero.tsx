import React from 'react'
import luffy from '../assets/luffy.jpg'

function Hero() {
  return (
    <main>
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <img
          src={luffy}
          alt="luffy cover"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            zIndex: 10,
            opacity: 0.8,
            
            
          }}
        />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4'>
          <input
            type="text"
            className='rounded-2xl border-2 border-white bg-white/80 backdrop-blur-md p-2 text-2xl px-4 text-blue-900 placeholder-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
            placeholder='Search your Episode'
            style={{
              minWidth: '280px',
              fontWeight: 500,
            }}
          />
          <button
            className='bg-blue-700/90 text-white px-6 py-2 rounded-full hover:bg-blue-800/90 shadow-lg font-semibold text-lg transition'
            style={{
              letterSpacing: '1px',
              boxShadow: '0 4px 16px 0 rgba(0,0,0,0.15)'
            }}
          >
            Search
          </button>
        </div>
      </div>
    </main>
  )
}

export default Hero
import React from 'react'

export default function SearchBar({value, setValue }) {
    function handleValue (e){
            setValue(e.target.value)
    }
  return (
    <div className='input-search'>
        <input type="text" value={value} onChange={handleValue}/>
        <button>Search</button>
    </div>
  )
}

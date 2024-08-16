import React from 'react'

const HighlightText = (text,value) => {
 

    const parts = text.split(new RegExp(`(${value})`, 'gi')).filter(Boolean);
    
  return (
    <>
    {parts.map(item=>item===value ? <span style={{color:'green'}}>{item}</span> : item)}
    </>
  )
}

export default HighlightText
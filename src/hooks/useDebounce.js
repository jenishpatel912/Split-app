import { useEffect, useState } from "react"

export const useDebounce = (value='') => {

  const [debounceText,setDebounceText] = useState(value);

  useEffect(()=>{
     const timeout = setTimeout(()=>{
         setDebounceText(value)
     },500)
     return () => clearTimeout(timeout)
  },[value])

  return [debounceText]

}

export const debounceFunc = (()=>{
    let timeout;
    return (value,cb) => {
    if(timeout) clearTimeout(timeout);
    
    timeout = setTimeout(()=>{
        cb()
    },500)

    }
})()
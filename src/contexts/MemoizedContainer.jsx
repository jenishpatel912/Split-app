import React from 'react'

const MemoizedContainer = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default React.memo(MemoizedContainer)
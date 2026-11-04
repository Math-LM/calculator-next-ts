import React from 'react'

type RowProps = {
    children: React.ReactNode;
}

const Row = ({children} : RowProps) => {
  return (
    <div className="flex w-full">
        {children}
    </div>
  )
}

export default Row
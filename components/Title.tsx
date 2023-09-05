import React from 'react'

type Props = {
    title : String
}

export default function Title({title, ...props}: Props) {
  return (
    <h1 className='text-2xl text-gray-900' {...props}>{title}</h1>
  )
}
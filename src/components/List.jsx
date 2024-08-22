import React from 'react'
import useAuth from '../Hooks/Auth'

const List = () => {
  useAuth()

  return (
    <div>List</div>
  )
}

export default List
import React from "react"
import { Link, useParams } from "react-router-dom"

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <Link to="/">Back to List</Link>
      <h1>Item Detail {id}</h1>
    </div>
  )
}

export default ItemDetailPage

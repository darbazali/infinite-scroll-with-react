import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()

  // Fetch and display the item detail based on the id
  return (
    <div>
      <h1>Item Detail {id}</h1>
      {/* Back to list with preserved state */}
      <Link
        to="/"
        state={{
          items: location.state?.items,
          page: location.state?.page,
          scrollPosition: location.state?.scrollPosition,
        }}
      >
        Back to List
      </Link>
    </div>
  )
}

export default ItemDetailPage

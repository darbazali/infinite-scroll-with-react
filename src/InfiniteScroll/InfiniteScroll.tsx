import React, { useState, useRef, useEffect, useCallback } from "react"
import { fetchItemsFromAPI } from "./api"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

const InfiniteScroll: React.FC = () => {
  const navigate = useNavigate()

  // Restore items and page from sessionStorage if available
  const savedItems = JSON.parse(sessionStorage.getItem("items") || "[]")
  const savedPage = Number(sessionStorage.getItem("page") || "1")

  const savedScrollPosition = Number(
    sessionStorage.getItem("scrollPosition") || "0",
  )

  const [items, setItems] = useState<string[]>(savedItems)
  const [page, setPage] = useState(savedPage)
  const loader = useRef<HTMLDivElement | null>(null)

  const fetchItems = useCallback(async () => {
    if (savedItems.length > 0 && savedPage === page) {
      return // Skip fetching if items are already in state
    }

    const newItems = await fetchItemsFromAPI(page) // Replace with your data fetching logic
    setItems((prev) => {
      const updatedItems = [...prev, ...newItems]
      sessionStorage.setItem("items", JSON.stringify(updatedItems)) // Save items to sessionStorage
      return updatedItems
    })
  }, [page, savedItems, savedPage])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => {
            const newPage = prev + 1
            sessionStorage.setItem("page", newPage.toString()) // Save page to sessionStorage
            return newPage
          })
        }
      },
      { threshold: 1.0 },
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current)
      }
    }
  }, [])

  useEffect(() => {
    // Restore scroll position after rendering
    window.scrollTo(0, savedScrollPosition)
  }, [])

  const handleItemClick = (item: string) => {
    // Save the current state before navigating
    sessionStorage.setItem("scrollPosition", window.scrollY.toString())
    navigate(`/item/${item}`)
  }

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <div className={styles.container}>
        {items.map((item) => (
          <Link
            key={item}
            to={`/item/${item}`}
            state={{ scrollPosition: window.scrollY }}
            onClick={() => handleItemClick(item)}
          >
            <div className={styles.item} onClick={() => handleItemClick(item)}>
              {item}
            </div>
          </Link>
        ))}
      </div>

      <div ref={loader}>Loading more items...</div>
    </div>
  )
}

export default InfiniteScroll

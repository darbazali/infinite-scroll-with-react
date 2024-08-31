import { BrowserRouter, Route, Routes } from "react-router-dom"
import InfiniteScroll from "./InfiniteScroll/InfiniteScroll"
import ItemDetailPage from "./InfiniteScroll/ItemDetail"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InfiniteScroll />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

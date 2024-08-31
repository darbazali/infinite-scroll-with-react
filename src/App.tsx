import { BrowserRouter, Route, Routes } from "react-router-dom"
import InfiniteScroll from "./InfiniteScroll/InfiniteScroll"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InfiniteScroll />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

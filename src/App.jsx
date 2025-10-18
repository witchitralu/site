import ArtGallery from './components/ArtGallery'
import { artPieces, categories } from './data/artData'
import './App.css'

function App() {
  return (
    <div className="app">
      <ArtGallery artPieces={artPieces} categories={categories} />
    </div>
  )
}

export default App

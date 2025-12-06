import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StudyPage from './pages/StudyPage'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subject/:subjectId" element={<StudyPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App

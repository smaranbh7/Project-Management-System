import Home from './pages/Home/Home'
import './App.css'
import Navbar from './pages/Navbar/Navbar'
import { Routes, Route } from "react-router-dom"
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/project/:id" element={<ProjectDetails/>}/>
    </Routes>
    </>
  )
}

export default App

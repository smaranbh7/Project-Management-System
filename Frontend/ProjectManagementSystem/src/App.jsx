import Home from './pages/Home/Home'
import './App.css'
import Navbar from './pages/Navbar/Navbar'
import { Routes, Route } from "react-router-dom"
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import IssueDetails from './pages/IssueDetails/IssueDetails'
import Subscription from './pages/Subscription/Subscription'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/project/:id" element={<ProjectDetails/>}/>
      <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails/>}/>
      <Route path="/upgrade_plan" element={<Subscription/>} />
    
    </Routes>
    </>
  )
}

export default App

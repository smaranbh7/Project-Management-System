import Home from './pages/Home/Home'
import './App.css'
import Navbar from './pages/Navbar/Navbar'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import IssueDetails from './pages/IssueDetails/IssueDetails'
import Subscription from './pages/Subscription/Subscription'
import Auth from './pages/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './redux/Auth/Action'
import { fetchProjects } from './redux/Project/Action'
import UpgradeSuccess from './pages/Subscription/UpgradeSuccess'
import AcceptInvitation from './pages/Project/AcceptInvitation'
import Landing from './pages/Landing/Landing'


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector(store => store)
  
  useEffect(() => {
    // Get user profile on app load if JWT exists
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      dispatch(getUser())
    }
  }, [dispatch])
  
  useEffect(() => {
    // When JWT is set (after login/signup), fetch user profile
    if (auth.jwt && !auth.user) {
      dispatch(getUser())
    }
  }, [auth.jwt, auth.user, dispatch])
  
  useEffect(() => {
    if (auth.user) {
      dispatch(fetchProjects({}))
      // Redirect to dashboard if user is on auth page after login
      if (location.pathname === '/auth') {
        console.log('User authenticated, redirecting to dashboard')
        navigate('/')
      }
    }
  }, [auth.user, dispatch, navigate, location.pathname])
  
  console.log(auth)
  
  return (
    <>
      {auth.user && <Navbar />}
      <Routes>
        {auth.user ? (
          // Authenticated routes
          <>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />} />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} />
            <Route path="/accept_invitaton" element={<AcceptInvitation />} />
            <Route path="/auth" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<Home />} />
          </>
        ) : (
          // Unauthenticated routes
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<Auth />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
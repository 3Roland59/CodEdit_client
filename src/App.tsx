import { Route, Routes } from 'react-router'
import './App.css'
import Homepage from './pages/Homepage'
import Notfound from './pages/Notfound'
import Authpage from './pages/Authpage'
import DashboardLayout from './pages/DashboardLayout'
import Home from './components/dashboard/Home'
import { Toaster } from './components/ui/sonner'
import PostChallenge from './components/dashboard/PostChallenge'
import Challenges from './components/dashboard/Challenges'
import ChallengeDetail from './components/dashboard/ChallengeDetail'
import StudentChallenge from './pages/StudentChallenge'
import Submissions from './components/dashboard/Submissions'
import ResultLookup from './pages/ResultLookup'

function App() {

  return (
    <>
        <Toaster />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/auth' element={<Authpage />} />
        <Route path='/dashboard' element={<DashboardLayout />} >
          <Route path='home' element={<Home />} />
          <Route path='post-challenge' element={<PostChallenge />} />
          <Route path='my-challenges' element={<Challenges />} />
          <Route path='my-challenges/:id' element={<ChallengeDetail />} />
          <Route path="submissions/:challengeId" element={<Submissions />} />
        </Route>
        <Route path='/challenge/:id' element={<StudentChallenge />} />
        <Route path="/results" element={<ResultLookup />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App

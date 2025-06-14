import { Route, Routes } from 'react-router'
import './App.css'
import Homepage from './pages/Homepage'
import Notfound from './pages/Notfound'
import Authpage from './pages/Authpage'
import DashboardLayout from './pages/DashboardLayout'
import Home from './components/dashboard/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/auth' element={<Authpage />} />
        <Route path='/dashboard' element={<DashboardLayout />} >
          <Route path='home' element={<Home />} />
        </Route>
        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App

import './App.css'
import Nav from './Pages/Nav'
import Home from './Pages/Home'
import Hospitals from './Pages/Hospitals'
import MyBooking from './Pages/MyBooking'
import { createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "hospitals",
        element: <Hospitals />
      },
      {
        path: "my-bookings",
        element: <MyBooking />
      }
    ],
  }
])
export default router

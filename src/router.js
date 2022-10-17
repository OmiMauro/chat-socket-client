import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Room from './pages/Room'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:roomId',
        element: <Room />,
      },
    ],
  },
  ,
])
export default router

//libraries
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import Home from './pages/Home';
import AllPlayers from './pages/AllPlayers';
import Player from './pages/Player';
import CreateGroups from './pages/CreateGroups';

//import App from './App.jsx'

//styles
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/allPlayers',
    element: <AllPlayers/>
  },
  {
    path: '/Player:id',
    element: <Player/>
  },
  {
    path: '/createGroups',
    element: <CreateGroups />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

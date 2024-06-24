//libraries
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import Home from './pages/Home';
import ManagePlayers from './pages/ManagePlayers';
import Player from './pages/Player';
import CreateGroups from './pages/CreateGroups';
import ConfirmGroups from './pages/ConfirmGroups';

//import App from './App.jsx'

import { PlayersProvider } from './contexts/PlayersContext.jsx';

//styles
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/ManagePlayers',
    element: <ManagePlayers/>
  },
  {
    path: '/Player:id',
    element: <Player/>
  },
  {
    path: '/CreateGroups',
    element: <CreateGroups />
  },
  {
    path: '/ConfirmGroups',
    element: <ConfirmGroups />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <PlayersProvider>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>,
  </PlayersProvider>
)

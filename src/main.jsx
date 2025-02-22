import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ItemPage from './pages/ItemPage/ItemPage.jsx';
import AllCompoPage from './pages/allCompoPage/AllCompoPage.jsx';
import ChampionDetailPage from './pages/championDetailPage/championDetailPage.jsx';

import CreateCompoPage from './pages/createCompoPage/CreateCompoPage.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {path: '', element:<App/>},
  {path: 'champion/:championName', element:<ChampionDetailPage/>},
  {path: '/items', element: <ItemPage/>},
  {path: '/compositions', element: <AllCompoPage/>},
  {path:'/createComposition', element:<CreateCompoPage/>}
])

root.render(
<Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
</Provider>
)


import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterReactBootstrap from "./components/RegisterReactBootstrap";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/layouts/Main';
import LoginBootstrap from './components/LoginBootstrap';
const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path:'/register',
        element:<RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path:'/login',
        element:<LoginBootstrap></LoginBootstrap>
      }
    ]
  }
])

function App() {
  
  return (
    <div >
     
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

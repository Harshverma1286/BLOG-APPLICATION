import { useEffect, useState } from 'react'
import {Outlet, useDispatch} from 'react-router-dom'
import authService from './appwrite/auth';
import {login, logout } from './Store/authslice';
import Header from './components/Header'
import Footer from './components/Footer'
function App() {
  const [loading,setloading] = useState(true);

  const dispatch = useDispatch();

  useEffect(()=>{
    authService.currentuser.then((user)=>{
      if(user){
        dispatch(login({user}))
      }
      else{
        dispatch(logout());
      }
    }).finally(()=> setloading(false))
  },[])




  return (
    !loading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header/>
          <main>
            <Outlet/>
          </main>
          <Footer/>
        </div>
      </div>
    ) : <div>loading.....</div>
  )
}

export default App

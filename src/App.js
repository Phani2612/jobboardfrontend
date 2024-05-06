import React from 'react'

import {BrowserRouter , Link , Route ,Routes} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Home from './COMPONENTS/Home'
import Download from './COMPONENTS/Download'
import Profile from './COMPONENTS/Profile'
import Show from './COMPONENTS/Show'
import Otherprofile from './COMPONENTS/Otherprofile'
import HighlightAboutUs from './COMPONENTS/About'
import Contact from './COMPONENTS/Contact'

import { createContext } from 'react'

export const Mybox = createContext()

function App() {


   const [UserInfo , setUserinfo] = React.useState(function()
  {
        const StoredData = localStorage.getItem('UserInfo')


        return StoredData ? JSON.parse(StoredData) : null
  })


  const [Disappear , setDisappear] = React.useState(false)

  const [Username, setUsername] = React.useState(function()
  {
        const Userstored = localStorage.getItem('Username')


        return Userstored ? JSON.parse(Userstored) : null
  })

  

 
  React.useEffect(function()
{

     localStorage.setItem('UserInfo', JSON.stringify(UserInfo))

},[UserInfo])


React.useEffect(function()
{

     localStorage.setItem('Username', JSON.stringify(Username))

},[Username])





  return (
     
     <div>

<Mybox.Provider  value = {{MyState : setDisappear}} >
     
<BrowserRouter>


<Routes>

<Route path='' element = {<Login data = {setUserinfo}  data1 = {setUsername} />} ></Route>


<Route path='/register' element = {<Register/>} ></Route>


<Route path='/home' element = {<Home data = {Disappear} />} ></Route>

<Route path='/view' element = {<Profile/>} ></Route>

<Route path='/show' element={<Show/>} ></Route>

<Route path='/view/:User' element = {<Otherprofile/>} ></Route>


<Route path='/about' element={<HighlightAboutUs/>}  ></Route>

<Route path='/contact' element={<Contact/>} ></Route>

</Routes>




</BrowserRouter>
</Mybox.Provider>





     </div>
  )
}

export default App
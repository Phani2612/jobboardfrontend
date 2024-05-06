import React from 'react'

import './App.css'

import Axios from 'axios'

import Server_URL from './COMPONENTS/MyUrl'

function Login(props) {

console.log(props.data1)

const [GatherLoginInfo , setGatherLoginInfo] = React.useState({

    email : '',

    password : '',

    username : ''
      
})


function SendLoginData(event)
{
        event.preventDefault()

        Axios.post(`${Server_URL}/login`, GatherLoginInfo).then(function(output)
        {
            console.log(output)
    
            if(output.data === '/home')
                {
                    window.location.pathname = '/home'

                    props.data(GatherLoginInfo.email)
                    
                    props.data1(GatherLoginInfo.username)
              

                } 
    
                if(output.data === '/login')
                    {
                        window.location.pathname = ''
                    }

                    if(output.data === '/register')
                        {
                            window.location.pathname = '/register'
                        }
    
    
        }).catch(function(error)
    {
         console.error(error)
    })
}


function CollectLogindata(event)
{
     
     setGatherLoginInfo({...GatherLoginInfo , [event.target.name] : event.target.value})
}





  return (
    <div>

<div class="login-container">
  <h2>Login</h2>
  <form class="login-form" action="#" method="post" onSubmit={SendLoginData}  >
  <input
    type="text"
    id="username"
    name="username"
 
    onChange={CollectLogindata}
    placeholder="Enter your username"
    required
  />
    <input type="email" name="email" placeholder="Email" required  onChange={CollectLogindata}  />
    <input type="password" name="password" placeholder="Password" required  onChange={CollectLogindata} />
    <input type="submit" value="Login"/>
  </form>
</div>







    </div>
  )
}

export default Login
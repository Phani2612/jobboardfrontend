import React from 'react'

import Axios from 'axios'

import Server_URL from './COMPONENTS/MyUrl'

function Register() {

const [Gatherinfo , setGatherInfo] = React.useState({

      username : '',

      email : '',

      password : '',

      confirmPassword : ''
})

const [Message , setMessage] = React.useState('')

function CollectData(event)
{
       console.log(event.target.name,':', event.target.value)


       setGatherInfo({...Gatherinfo , [event.target.name] : event.target.value})
}


function SendData(event)
{
       event.preventDefault()

       Axios.post(`${Server_URL}/register`, Gatherinfo).then(function(output)
    {
        console.log(output)

        if(output.data === '/login')
            {
                window.location.pathname = ''
            }
         
        
        else{

                setMessage(output.data)
        }



    }).catch(function(error)
{
     console.error(error)
})
}


  return (
    <div>


<div class="register-container">
  <h2>Register</h2>
  <form class="register-form" action="#" method="post" onSubmit={SendData}  >
    <input type="text" name="username" placeholder="Username" required  onChange={CollectData}  />
    <input type="email" name="email" placeholder="Email" required  onChange={CollectData}  />
    <input type="password" name="password" placeholder="Password" required  onChange={CollectData}  />
    <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={CollectData}  />
    <input type="submit" value="Register"/><br/>
    {Message ? Message : null}
  </form>
</div>




    </div>
  )
}

export default Register
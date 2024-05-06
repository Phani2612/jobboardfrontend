import React from 'react'
import Axios from 'axios'
import Server_URL from './MyUrl'
import '../App.css'
import ProfileModal from './ProfileModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar'
import Educationmodal from './Educationmodal'
import Workmodal from './Workmodal'


function Skillmodal() {


  const Userfetchdata =  JSON.parse(localStorage.getItem('UserInfo'))

  const [Collect , setCollect] = React.useState({

    skills : '',
})


  function Collectdetails(event)
  {
       console.log(event.target.name,":",event.target.value)
  
       setCollect({...Collect , [event.target.name]:event.target.value})
  
      //  setPhone({...Phone, [event.target.name]:event.target.value})
  }

  function handleSubmit(event)
  {
        event.preventDefault()
  
     
  
        Axios.patch(`${Server_URL}/update/${Userfetchdata}/Skills`,Collect).then(function(output)
      {
          console.log(output)
      }).catch(function(error)
      {
          console.error(error)
      })
  }
  


  return (
    <div>



<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...

        <form className='skillform'  onSubmit={handleSubmit}>
      <label htmlFor="skill">Skill:</label>
      <input
        type="text"
        id="skill"
        name="skills"
       
        onChange={Collectdetails}
        required
      />
      <button type="submit">Add Skill</button>
    </form>




      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>



    </div>
  )
}

export default Skillmodal
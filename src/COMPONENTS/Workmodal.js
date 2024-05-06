import React from 'react'
import Axios from 'axios'
import Server_URL from './MyUrl'

function Workmodal() {

    const [Work , setWork] = React.useState({

        companyName : '',

        position : '',

        startDate : '',

        endDate : '',

        description : ''


   })


   const Userfetchdata =  JSON.parse(localStorage.getItem('UserInfo'))

   const UsersimpleName = JSON.parse(localStorage.getItem('Username'))


   function Collectwork(event)
   {
       setWork({...Work, [event.target.name]:event.target.value})
   }
   
   function handlework(event)
   {
   
       event.preventDefault()
   
   
       console.log(Work)
   
   
       Axios.patch(`${Server_URL}/update/${Userfetchdata}/Work`,Work).then(function(output)
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
  Add Details
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

      <form  className="form-container" onSubmit={handlework}>
      <label>
        Company Name:
        <input
          type="text"
         
          name="companyName"
          onChange={Collectwork}
          className="form-input"
          required
        />
      </label>
      <label>
        Position:
        <input
          type="text"
          name="position"
          className="form-input"
          onChange={Collectwork}
          required
        />
      </label>
      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          className="form-input"
          onChange={Collectwork}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="endDate"
          className="form-input"
          onChange={Collectwork}
          required
        />
      </label>
      <label>
        Description:
        <textarea
           className="form-textarea"
          name='description'
          onChange={Collectwork}
          required
        />
      </label>
      <button type="submit">Submit</button>
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

export default Workmodal
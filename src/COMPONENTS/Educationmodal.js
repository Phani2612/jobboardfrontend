import React from 'react'
import Axios from 'axios'
import Server_URL from './MyUrl'


function Educationmodal() {

    const Userfetchdata =  JSON.parse(localStorage.getItem('UserInfo'))

    const UsersimpleName = JSON.parse(localStorage.getItem('Username'))

    const[education , seteducation] = React.useState({

        institution : '',

        degree : '',

        fieldOfStudy : '',

        startDate : '',

        endDate : ''
  })

  function Collecteducation(event)
{
    seteducation({...education, [event.target.name]:event.target.value})
}

  function handleeducation(event)
  {
  
      event.preventDefault()
  
  
     
  
      Axios.patch(`${Server_URL}/update/${Userfetchdata}/Education`,education).then(function(output)
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


      <form className="form-container" onSubmit={handleeducation}>
  <label>
    School/University Name:
    <input
      type="text"
      className="form-input"
      name="institution"
      onChange={Collecteducation}
      required
    />
  </label>
  <label>
    Degree/Course:
    <input
      type="text"
      className="form-input"
      name="degree"
      onChange={Collecteducation}
      required
    />
  </label>
  <label>
    Field of Study:
    <input
      type="text"
      className="form-input"
      name="fieldOfStudy"
      onChange={Collecteducation}
      required
    />
  </label>
  <label>
    Start Date:
    <input
      type="date"
      className="form-input"
      name="startDate"
      onChange={Collecteducation}
      required
    />
  </label>
  <label>
    End Date:
    <input
      type="date"
      className="form-input"
      name="endDate"
      onChange={Collecteducation}
      required
    />
  </label>
  <button type="submit" className="submit-btn">Submit</button>
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

export default Educationmodal
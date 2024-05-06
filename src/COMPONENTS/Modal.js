import React from 'react'
import '../App.css'
import Axios  from 'axios'
import Server_URL from './MyUrl'

function Modal() {

const [Jobdetails , setJobdetails] = React.useState({

     jobTitle : '',
     vacancies : '',
     skillRequirement : '',
     experience : '',
     companyName : ''


})

const Userfetchdata =  JSON.parse(localStorage.getItem('UserInfo'))


function CollectJobboarddetails(event)
{
      console.log(event.target.name,':',event.target.value)
      setJobdetails({...Jobdetails , [event.target.name] : event.target.value})
}


function SendJobboarddetails(event)
{
  
    event.preventDefault()
   
    console.log(Jobdetails)


    Axios.post(`${Server_URL}/jobpost`, {Jobdetails , Userfetchdata }).then(function(output)
{
    console.log(output)
    window.location.pathname = '/home'
}).catch(function(error)
{
    console.error(error)
})

}




  return (
    <div >


<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"   >
  
 Post a Job
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Job Posting</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

    <form id="jobForm"  action="#" method='post' onSubmit={SendJobboarddetails} >

    <label htmlFor="companyName">Company Name:</label>
    <input
      type="text"
      id="companyName"
      name="companyName"
      className="form-control"
      required
      onChange={CollectJobboarddetails}
    />


    <label for="jobTitle">Job Title:</label><br/>
    <input type="text" id="jobTitle" name="jobTitle" required   onChange={CollectJobboarddetails}  /><br/>
    
    <label for="vacancies">Vacancies:</label><br/>
    <input type="number" id="vacancies" name="vacancies" required   onChange={CollectJobboarddetails}   /><br/>
    
    <label for="skillRequirement">Skill Requirement:</label><br/>
    <textarea id="skillRequirement" name="skillRequirement" rows="4" cols="50" required   onChange={CollectJobboarddetails}    ></textarea><br/>
    
    <label for="experience">Experience Required:</label><br/>
    <input type="text" id="experience" name="experience" required   onChange={CollectJobboarddetails}    /><br/>

    
    <input type="submit"   />
</form>
    
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      
      </div>
    </div>
  </div>
</div>




    </div>
  )
}

export default Modal
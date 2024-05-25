import React from 'react'
import Server_URL from './MyUrl'
import Axios from 'axios'


function Apply(props) {

const[Applicationdata , setApplicationData] = React.useState({

     resume : null ,

     skills : '',

     email : '',

     contactNumber : '',

     educationHistory : ''


})








function CollectApplication(event) {
  if (event.target.name === 'resume') {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
          setApplicationData({
              ...Applicationdata,
              resume: reader.result // Store the data URL in the state
          });
      };
      if (file) {
          reader.readAsDataURL(file);
      }

      
  } 
  
  else {
      setApplicationData({
          ...Applicationdata,
          [event.target.name]: event.target.value
      });
  }
}


function SendApplication(event)
{

    event.preventDefault()
  
    console.log(props.data)

    console.log(Applicationdata)

    
    Axios.post(`${Server_URL}/apply`,{Applicationdata,  PostOwner : props.data}).then(function(output)
    {
         console.log(output)
    }).catch(function(error)
    {
         console.error(error)
    })

 window.location.pathname ='/home'
}




  return (
    <div>


<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
 Apply
</button>


<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Job Application Form</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       

      <h2>Job Application Form</h2>
    <form id="jobApplicationForm" action="#" method="post" enctype="multipart/form-data"  onSubmit={SendApplication} >
        <label for="resume">Upload Resume:</label><br/>
        <input type="file" id="resume"  accept='images/jpg '  name="resume"  onChange={CollectApplication}  required/><br/>
        
        <label for="skills">Skills:</label><br/>
        <textarea id="skills" name="skills" rows="4" cols="50" required  onChange={CollectApplication}  ></textarea><br/>
        
        <label for="email">Email:</label><br/>
        <input type="email" id="email" name="email" required   onChange={CollectApplication}    /><br/>
        
        <label for="contactNumber">Contact Number:</label><br/>
        <input type="tel" id="contactNumber" name="contactNumber" pattern="[0-9]{10}" required   onChange={CollectApplication}     /><br/>
        
        <label for="educationHistory">Education History:</label><br/>
        <textarea id="educationHistory" name="educationHistory" rows="4" cols="50" required   onChange={CollectApplication}    ></textarea>
        
        <input type="submit" value="Submit Application"/>
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

export default Apply

import React from 'react'
import Axios from 'axios'
import Server_URL from './MyUrl'
import Navbar from './Navbar'

function Show() {

const [Showing , setShowing] = React.useState([])

React.useEffect(function()
{

    Axios.get(`${Server_URL}/jobposts`).then(function(output)
{
    console.log(output.data)

    setShowing(output.data)
}).catch(function(error)
{
    console.error(error)
})

},[])

const Userfetchdata =  JSON.parse(localStorage.getItem('UserInfo'))


function downloadResume(path) {
   
    const fileName = 'resume.pdf'; // Get the last part, which is the file name


    Axios.get(`${Server_URL}/download/${path}`, { responseType: 'blob' }).then(response => {
        
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        console.log("url:",url)
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Set the download attribute to the file path
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Error downloading resume:', error);
      });
  }


  return (
    <div>
      <Navbar/>
<div className="job-applications">
{Showing.map(function (i) {
  // Filter out the job details where UserName doesn't match Userfetchdata
  if (i.UserName === Userfetchdata) {
    return (
      <div className="job-details" key={i._id}>
        <h1>{i.JobTitle}</h1>
        <h3>Applicants:</h3>
        {i.Applications.map(function (j) {
          return (
            <div className="applicant" key={j._id}>
              <h4>{j.Email}</h4>
              <p>
                <strong>Skills:</strong> {j.Skills}
              </p>
              <p>
                <strong>Contact Number:</strong> {j.ContactNumber}
              </p>
              <p>
                <strong>Education:</strong> {j.Education}
              </p>
              <button
                type="button"
                onClick={() => downloadResume(j.Resume)}
              >
                Download resume
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null; // Return null for job details that don't match
  }
})}

</div>

    </div>
  )
}

export default Show

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

function Profile() {

    const Userfetchdata =  JSON.parse(localStorage.getItem('UserInfo'))

    const UsersimpleName = JSON.parse(localStorage.getItem('Username'))


    const [userDetails , setUserdetails] = React.useState([])


    const [imagedata , setimagedata] = React.useState()


    const [Collect , setCollect] = React.useState({

          skills : '',
    })

    const[Phone , setPhone] = React.useState({

            phone : ''
    })


    const [Work , setWork] = React.useState({

         companyName : '',

         position : '',

         startDate : '',

         endDate : '',

         description : ''


    })


    const[education , seteducation] = React.useState({

          institution : '',

          degree : '',

          fieldOfStudy : '',

          startDate : '',

          endDate : ''
    })


React.useEffect(function()
{
    Axios.get(`${Server_URL}/userprofile/${Userfetchdata}`).then(function(output)
{
      console.log(output)

      setUserdetails(output.data)
}).catch(function(error)
{
     console.error(error)
})
     
},[])










function Collectdetails(event)
{
     console.log(event.target.name,":",event.target.value)

     setCollect({...Collect , [event.target.name]:event.target.value})

     setPhone({...Phone, [event.target.name]:event.target.value})
}


function Collectwork(event)
{
    setWork({...Work, [event.target.name]:event.target.value})
}


function Collecteducation(event)
{
    seteducation({...education, [event.target.name]:event.target.value})
}


function handleSubmit(event)
{
      event.preventDefault()

     console.log(Work)

      Axios.patch(`${Server_URL}/update/${Userfetchdata}/Skills`,Collect).then(function(output)
    {
        console.log(output)
    }).catch(function(error)
    {
        console.error(error)
    })
}



function handlephone(event)
{
      event.preventDefault()



      Axios.patch(`${Server_URL}/update/${Userfetchdata}/Contact`,Phone).then(function(output)
    {
        console.log(output)
    }).catch(function(error)
    {
        console.error(error)
    })
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



// function Collectimage(event) {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onload = () => {
//     const imageData = reader.result; // Get the data URL

//     const formData = new FormData();
//   formData.append('image', file);
  
//     Axios.post(`${Server_URL}/uploadImage`, { image: imageData })
//       .then(response => {
//         // Handle response from backend
//         console.log('Image uploaded successfully');

//         console.log(response.data)

//         setimagedata(response.data)

      


//       })
//       .catch(error => {
//         // Handle error
//         console.error('Error uploading image:', error);
//       });
//   };

//   if (file) {
//     reader.readAsDataURL(file);
//   }

//   const imageName = imagedata; // Replace with the actual image filename
// const imageUrl = `${Server_URL}/Files/${imageName}`;
// document.getElementById('uploadedImage').src = imageUrl;

// }




  return (
    <div>
<Navbar/>
 <div className='profilecontainer'  >

    {

          userDetails.map(function(i)
        {
              return  <div>


    <div id='Username' >
 
     <h1>{UsersimpleName}</h1>

    </div>

{/* <div>


       <img  id="uploadedImage" src={`data:image/jpeg;base64,${imagedata}`} alt='upload' />
    <input type="file" accept="image/JPG" name="profile" onChange={Collectimage}  />
</div> */}
    
    <div id='contactinfo' >

         <div id='email' >Email : {i.UserEmail}</div>

         {!i.ContactInfo ?  <form className='phoneform' onSubmit={handlephone}>
      <label>
        Phone Number:
        <input
          type="tel"
          name='phone'
          onChange={Collectdetails}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form> : <div id='phone' >Phone : {i.ContactInfo}  </div> }

    </div>


   {!i.Skills ?<form className='skillform'  onSubmit={handleSubmit}>
      <label htmlFor="skill">Skill:</label>
      <input
        type="text"
        id="skill"
        name="skills"
       
        onChange={Collectdetails}
        required
      />
      <button type="submit">Add Skill</button>
    </form>  :  
   <div id='skills' className='skills-container'>
   <h3 className='skills-heading'>Skills</h3>
   <ul className='skills-list'>
     {i.Skills.split(',').map((skill, index) => (
       <li key={index} className='skill-item'>{skill.trim()}</li>
     ))}
   </ul>
 </div>}

  <h2>Work Experience</h2>
    
   {i.WorkExperience.length == 0 ? <form  className="form-container" onSubmit={handlework}>
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
    </form> :  <div className="work-experience-container" >

    
    {i.WorkExperience.map(function(j,index)
    {
        return <div  className="work-experience-item" >

          <h4  className="company-name"  >Company Name : {j.Company}</h4>

          <h4 className="position"   >Position : {j.Position}</h4>
          <h4 className="date"   >StartDate : {j.StartDate}</h4>
          <h4  className="date" >Enddate : {j.EndDate}</h4>
          <h4  className="description"  >Description : {j.Description}</h4>
         
         {index === i.WorkExperience.length - 1 ?  <Workmodal/> : null }

        </div>
    })}
</div>}


    
    <div id='careerstatus' >


    </div>

<h2>Education background</h2>

   {i.Education.length == 0 ? <form className="form-container" onSubmit={handleeducation}>
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
 :  
    <div className="college-details-container" >

  {i.Education.map(function(j,index)
  {
       return <div>



      <h4 className="college-name"  >College Name{j.Institution}</h4>

<h4   className="degree">Degree : {j.Degree}</h4>

<h4   className="field-of-study"   >Field : {j.FieldOfStudy}</h4>


<h4  className="date"  >Start Date : {j.StartDate}</h4>


<h4 className="date"  >End Date : {j.EndDate}</h4>


{index === i.Education.length - 1 ?  <Educationmodal/> : null }

       </div>
  })}
        
    </div>}


    <div className="posts-section">
            <h3>Posts</h3>
            {i.posts.map(post => (
              <div key={post._id} className="post-item">
                <p className="post-details">Post: {post.PostDetails}</p>
              </div>
            ))}
          </div>


          <div className="job-posts-section">
            <h3>Job Posts</h3>
            {i.jobposts.map(jobPost => (
              <div key={jobPost._id} className="job-post-item">
                <p className="job-post-details">Job Post: {jobPost.JobPosts}</p>
              </div>
            ))}
          </div>


              </div>
        })
    }


 </div>




</div>
  )
}

export default Profile

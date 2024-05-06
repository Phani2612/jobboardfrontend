import React from 'react'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faThumbsUp , faComment } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import Axios from 'axios'
import Server_URL from './MyUrl';
import Modal from './Modal';
import Apply from './Apply';
import { Link } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { useContext } from 'react';
import { Mybox } from '../App';

function Home(props) {

    const {MyState} = useContext(Mybox)

const [CollectPost , setCollectPost] = React.useState({

    postcontent : ''

})

const [Appear,setAppear] = React.useState(false)


const [Display , setDisplay] = React.useState([])


const [Jobpost , setjobpost] = React.useState([])


const [Icon , setIcon] = React.useState([])

const [Comment , setComment] = React.useState([])

React.useEffect(function()
{

    Axios.get(`${Server_URL}/posts`).then(function(output)
{
     
     setDisplay(output.data)

}).catch(function(error)
{
    console.error(error)
})

},[])



React.useEffect(function()
{

    Axios.get(`${Server_URL}/jobposts`).then(function(output)
{
     
     setjobpost(output.data)

}).catch(function(error)
{
    console.error(error)
})

},[])


React.useEffect(function()
{
    const icons = [];

    icons.push(<FontAwesomeIcon icon={faThumbsUp}/>)
    

    setIcon(icons)

},[])


React.useEffect(function()
{
    const coms = [];

    coms.push(<FontAwesomeIcon icon={faComment}/>)
    

    setComment(coms)

},[])




const UsersimpleName = JSON.parse(localStorage.getItem('Username'))

function CollectData(event)
{
     setCollectPost({...CollectPost , [event.target.name] : event.target.value})
}

const Userfetchdata =  JSON.parse(localStorage.getItem('UserInfo'))


function SendData(event)
{
      event.preventDefault()

      console.log(CollectPost)

      Axios.post(`${Server_URL}/posts`,{CollectPost,Userfetchdata}).then(function(output)
    {
         console.log(output)
    }).catch(function(error)
    {
         console.error(error)
    })

    window.location.pathname = '/home'
}









function Likebutton(Owner)
{
    console.log(Owner)
    Axios.post(`${Server_URL}/likepost/${Userfetchdata}`,{Ownername : Owner}).then(function(output)
    {
         if(output.data === true)
            {
                

                
            }
    }).catch(function(error)
    {
         console.error(error)
    })
}




  return (
    <div>

<Navbar/>


{props.data ? null : <div>
    
    
    
<form class="post-form" action="#" method="post" onSubmit={SendData}  >
  <textarea name="postcontent" placeholder="What's on your mind?" required  onChange={CollectData}  ></textarea>
  <button type="submit">Post</button>
 
  

</form>




<div id='modalform'   >
<Modal class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" placeholder = 'Post the Job' />
</div>






    {
        Display.map(function(i)
    {
        
         if(i.UserName != Userfetchdata)
          {
              
         return <div id='postbody' >

         
         <div id='posthead'  >
         <FontAwesomeIcon  icon={faUser} height='20px' width='30px'  />
         <Link to={`/view/${i.UserName}`} ><h6>{i.UserName}</h6></Link>
        
         </div>


        <h6>{i.PostDetails}</h6>
         
        <div id='timeanddate' >
        <h6>{i.Date}</h6>
          <h6>{i.Time}</h6>
        </div>





                  </div>


                  
          }

       

          
       
      
    })
    }



{
        Jobpost.map(function(i)
    {
        
         if(i.UserName != Userfetchdata)
          {
              
         return <div id='postbody' >

         
         <div id='posthead'  >
         <FontAwesomeIcon  icon={faUser} height='20px' width='30px'  />
         <Link  ><h6>{i.UserName}</h6></Link>
         </div>


         <h6>Company Name : {i.CompanyName}</h6>
         <h6>JobTitle : {i.JobTitle}</h6>

         <h6>Vacancies : {i.Vacancies}</h6>

         <h6>Skills : {i.SkillRequirement}</h6>

         <h6>Experience : {i.Experience}</h6>
        
         <Apply data = {i._id}  >Apply</Apply>
         
         <div id='timeanddate' >
        <h6>{i.Date}</h6>
          <h6>{i.Time}</h6>
        </div>
         
                  </div>
          }
    })
    }


    
    </div>}






    </div>
  )
}

export default Home
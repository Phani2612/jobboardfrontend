import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import Server_URL from './MyUrl';
import Apply from './Apply';
import { useContext } from 'react';
import { Mybox } from '../App';

function Navbar() {

  const {MyState} = useContext(Mybox)

  const[Display , setDisplay] = React.useState([])

  const [Searched , setSearched] = React.useState([])

  const[Anothersearch , setanothersearch] = React.useState([])

  const [Another , setAnother] = React.useState(false)
 
  const [Gather , setGather] = React.useState('')

  const [Users , setUsers] = React.useState([])


  React.useState(function()
{

  Axios.get(`${Server_URL}/jobposts`).then(function(output)
{
     
     setDisplay(output.data)

}).catch(function(error)
{
    console.error(error)
})

},[])



React.useState(function()
{

  Axios.get(`${Server_URL}/loginusers`).then(function(output)
{
     
     setUsers(output.data)

}).catch(function(error)
{
    console.error(error)
})

},[])








  function SearchItems(event)
  {

     if(event.target.value === '')
      {
        MyState(false)
        setAnother(false)

        
      }

      else{

        
        const Searchedterm = event.target.value.toLowerCase()

        

        const FilteredProducts = Display.filter(function(i)
        {
          if(i.CompanyName.toLowerCase().startsWith(Searchedterm) || i.JobTitle.toLowerCase().startsWith(Searchedterm) || i.UserName.toLowerCase().startsWith(Searchedterm)   )
          {
                 return i
          }

        })


        const FilteringProducts = Users.filter(function(i)
        {
          if(i.UserName.toLowerCase().startsWith(Searchedterm) || i.UserEmail.toLowerCase().startsWith(Searchedterm) )
          {
                 return i
          }

        })
        

          
        if(FilteredProducts.length > 0)
          {
              setAnother(true)
              setSearched(FilteredProducts)
              MyState(true)
          }

          else{

             setAnother(false)
             setSearched([])
             MyState(false)
          }

             
        if(FilteringProducts.length > 0)
          {
              setAnother(true)
              setanothersearch(FilteringProducts)
              MyState(true)
          }

          else{

             setAnother(false)
             setanothersearch([])
             MyState(false)
          }

      }

  }

  function Navigate()
  {
     window.location.pathname = ''
  }
  return (
    <div>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to='/home'  >Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link to='/show'   class="nav-link" >Applications</Link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link class="dropdown-item" to='/about' >About Us</Link>
          <Link class="dropdown-item" to='/contact' >Contact Us</Link>
         
          
        </div>
      </li>
      

   
    </ul>
    <form  class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={SearchItems}   />
     
    </form>

<div class="dropdown show" id='dropdown'  >
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <FontAwesomeIcon  className='iconuser'  icon={faUser}/>
  </a>

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <Link to='/view' class="dropdown-item" >View Profile</Link>
    <Link onClick={function()
      {
         Navigate()
      }
    }  class="dropdown-item" >Logout</Link>
   
  </div>
</div>

      
     

  </div>
</nav>


<div>


{Another ?  Searched.map(function(i)
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
  }) : null }


{Another ?  Anothersearch.map(function(i)
  {
      return <div id='postbody' >


    <Link  to={`/view/${i.UserEmail}`}  >    <h1>{i.UserEmail}</h1></Link>

</div>
         
     
  }) : null }


</div>

    </div>
  )
}

export default Navbar
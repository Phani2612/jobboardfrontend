import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Server_URL from './MyUrl';
import '../App.css'; // Import CSS file for styling
import Navbar from './Navbar';

function OtherProfile() {
  const { User } = useParams();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    Axios.get(`${Server_URL}/userprofile/${User}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [User]);

  return (
   <div>
    <Navbar/>
   
  <div className="other-profile-container">
      {userData.map(profile => (
        <div key={profile._id} className="profile-section">
          <h2 id='otherprofilename' >{profile.UserName}'s Profile</h2>

          <div className="education-section">
            <h3>Education</h3>
            {profile.Education.map(education => (
              <div key={education._id} className="education-item">
                <p className="institution">Institution: {education.Institution}</p>
                <p className="degree">Degree: {education.Degree}</p>
                <p className="field-of-study">Field of Study: {education.FieldOfStudy}</p>
                <p className="dates">Dates: {education.StartDate} - {education.EndDate}</p>
              </div>
            ))}
          </div>

          <div className="work-experience-section">
            <h3>Work Experience</h3>
            {profile.WorkExperience.map(work => (
              <div key={work._id} className="work-experience-item">
                <p className="company">Company: {work.Company}</p>
                <p className="position">Position: {work.Position}</p>
                <p className="dates">Dates: {work.StartDate} - {work.EndDate}</p>
                <p className="description">Description: {work.Description}</p>
              </div>
            ))}
          </div>

          <div className="skills-section">
            <h3>Skills</h3>
            <p className="skills">{profile.Skills}</p>
          </div>

          <div className="posts-section">
            <h3>Posts</h3>
            {profile.posts.map(post => (
              <div key={post._id} className="post-item">
                <p className="post-details">Post: {post.PostDetails}</p>
              </div>
            ))}
          </div>


          <div className="job-posts-section">
            <h3>Job Posts</h3>
            {profile.jobposts.map(jobPost => (
              <div key={jobPost._id} className="job-post-item">
                <p className="job-post-details">Job Post: {jobPost.JobPostDetails}</p>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>










   </div>
  );
}

export default OtherProfile;

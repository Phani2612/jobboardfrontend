import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Server_URL from './MyUrl';

function Download() {
  const [view, setView] = useState([]);

  useEffect(() => {
    Axios.get(`${Server_URL}/applications`)
      .then(response => {
        setView(response.data);
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
      });
  }, []);

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
      {view.map((application, index) => (
        <button key={index} type="button" onClick={() => downloadResume(application.Resume)}>
          Download resume
        </button>
      ))}
    </div>
  );
}

export default Download;

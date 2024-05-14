import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminReports() {
    const [reports, setReports] = useState([]);
  
  useEffect(() => {
    getreports();
  }, []);
  const navigate=useNavigate();
  const medirep=(id)=>{
    
      navigate(`/update/${id}`)
  }


  const getreports=()=>{
    axios
      .get('http://localhost:3001/patient/view')
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }; const onDeleteClick =async (id) => {
      
    
    await axios
       .delete("http://localhost:3001/patient/delete",{ data: { PID: id } })
       .then((res) => {
         console.log(res.data.deletedCount);
         
         if(res.data.deletedCount){
             navigate('/allreports');

         }
        // 
       })
       .catch((err) => {
         console.log(err);
       });
       window.location.reload();
   };
  
  const reportList =
  reports.length === 0
      ? 'there are no Reports!'
      : reports.map((report) => <> 
      <table border={1} className='table'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Patient ID :</td>
            <td>{report.PID}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Patient Name :</td>
            <td>{report.Name}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Patient Age :</td>
            <td>{report.Age}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Life insurance info :</td>
            <td>{report.Linfo}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Current symptoms :</td>
            <td>{report.symptoms}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Patient allergies :</td>
            <td>{report.Allergies}</td>
          </tr>
          <tr>
            <th scope='row'>7</th>
            <td>Current other illnesses :</td>
            <td>{report.Illnesses}</td>
          </tr>
          <tr>
            <th scope='row'>8</th>
            <td>Previous medical info :</td>
            <td>{report.MedInfo}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={()=>medirep(report.PID)}>UPDATE</button>
        <button onClick={() => {
    if (window.confirm("Are you sure you want to delete this report?")) {
        onDeleteClick(report.PID);}}}>DELETE</button>
      
      </>);

  return (
    <>

    {reportList}








    </>
  )
}

import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DeleteReport from './DeleteReport'
import axios from 'axios';
import { Route, Routes} from 'react-router-dom'
import UpdateReport from './UpdateReport';
import DisplayUploadedFiles from './uploadedfiles';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import viewcss from './viewreport.css'
import './uploadedfiles.css'
function Viewreport({ images, onDeleteImage }) {
    const {id}=useParams();
    const navigate = useNavigate();
    const pdfref=useRef();
    const [report, setreport] = useState({
        PID: "",
        Name: "",
        Age: "",
        Linfo: "",
        symptoms: "",
        Allergies: "",
        Illnesses: "",
        MedInfo: "",
      });

      

      const getreport=()=>{
         axios
          .get(`http://localhost:3001/patient/${id}`)
          .then((res) => {
            console.log(res.data[0].Age)
            setreport({
                PID: res.data[0].PID,
                Name: res.data[0].Name,
                Age: res.data[0].Age,
                Linfo: res.data[0].Linfo,
                symptoms: res.data[0].symptoms,
                Allergies: res.data[0].Allergies,
                Illnesses: res.data[0].Illnesses,
                MedInfo: res.data[0].MedInfo,
              });
            console.log(res)
          })
          .catch((err) => {
            console.log('Error from ShowBookDetails',err);
          });
      }
      useEffect(() => {
        if (id) {
          getreport();
        }
        
      }, [id]);

      console.log(report)
      const downloadpdf=()=>{
        const input=pdfref.current;
        const contentWidth = input.offsetWidth;
        const contentHeight = input.offsetHeight;
        const canvas = document.createElement('canvas');
    canvas.width = contentWidth;
    canvas.height = contentHeight;
    const context = canvas.getContext('2d');
    context.scale(2, 2);
        html2canvas(input).then((canvas)=>{
          const imgData = canvas.toDataURL('image/png');
          const pdf=new jspdf('p','mm','a4',true);
          const pdfwidth=pdf.internal.pageSize.getWidth();
          const pdfheight=pdf.internal.pageSize.getHeight();
          const ratio=Math.min(pdfwidth,pdfheight);
          pdf.addImage(imgData, 'JPEG', 0, 0);
          pdf.save('report.pdf');

        });
      };
    return (
      <>
      <div ref={pdfref} className='pdf-container'>
      <h1 className='h1'>Medical Report</h1>
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
      </table></div>
      <DisplayUploadedFiles className="disp" images={images} onDeleteImage={onDeleteImage}></DisplayUploadedFiles>
      
       
        <button><Link to="/updatereport" >Update Medical Report</Link></button>
        <button><Link to="/deletereport" >Delete Medical Report</Link></button>
        <button onClick={downloadpdf}>Download Medical Report</button>
        
        <Routes>
        <Route path='/updatereport' element={<UpdateReport id={id}></UpdateReport>}></Route>
        
        </Routes>
        
      </>
    );
  }
  
  export default Viewreport;
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Route, Routes} from 'react-router-dom'
import Reporthome from './reporthome'
import Viewreport from "./viewreport";
import UpdateReport from "./UpdateReport";
import DeleteReport from "./DeleteReport";
import DisplayUploadedFiles from "./uploadedfiles";
import formcss from './ReportForm.css';
import Header from "./Header";
import Footer from "./Footer";

function CreateReport(props) {
  const navigate = useNavigate();
  //const [selectedFiles, setSelectedFiles] = useState([]);
  const [upimgs, setUpimgs] = useState([]);
  const inputEl = useRef(null);
  let incorret="";
  let [errors, setErrors] = useState("");
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

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(imagePromises)
      .then((imageDataUrls) => {
        const updatedImages = [...upimgs, ...imageDataUrls];
        console.log(updatedImages); // Check if images are being added to the state
        setUpimgs(updatedImages);
      })
      .catch((error) => console.error('Error reading files:', error));
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...upimgs];
    updatedImages.splice(index, 1);
    setUpimgs(updatedImages);
  };

 /* const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const handleUpload = () => {
    selectedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target.result;
        localStorage.setItem(file.name, fileContent);
      };

      reader.readAsText(file);
    });

    console.log('Files uploaded to local storage.');}*/

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'PID' && !(/^[0-9]*$/).test(value)) {
      // If it's not a number, display an alert and return
      console.log('Patient ID must be numeric.');
      return;
    }
    setreport({...report, [e.target.name]: e.target.value });
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    errors = {};
  if (!report.PID.trim()) {
    errors.PID = 'Patient ID is required.';
    inputEl.current.focus();
    incorret="incorrect input";
  }
  if (!report.Name.trim()) {
    errors.Name = 'Patient Name is required.';
  }
  if (!report.Age.trim()) {
    errors.Age = 'Patient Age is required.';
    
  }
  
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
    await axios
      .post("http://localhost:3001/patient/create", report)
      .then((res) => {
        navigate("/reporthome");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const repui=(<><h1 >Create Medical report</h1>
            
  <form noValidate onSubmit={onSubmit} className="form-container">

    <label> Patient ID :</label>
      <input required ref={inputEl}
        type="number"
        placeholder="ID of the Patient"
        name="PID"
        value={report.PID}
        onChange={onChange}
      /> {incorret}
      <br />
    
    <br />
    
    <label> Patient Name :</label>
      <input required
        type="text"
        placeholder="Name of the Patient"
        name="Name"
        value={report.Name}
        onChange={onChange}
      />
    
    <br />
    
    <label> Patient Age :</label>
      <input required
        type="number"
        placeholder="Age of the Patient"
        name="Age"
        value={report.Age}
        onChange={onChange}
      />
    
    <br />
    
    <label> Life insurance info :</label>
      <input
        type="text"
        placeholder="Details of life insurance"
        name="Linfo"
        value={report.Linfo}
        onChange={onChange}
      />
    
    <br />
    
    <label> Current symptoms :</label>
      <input
        type="text"
        placeholder="Current symptoms of the Patient"
        name="symptoms"
        value={report.symptoms}
        onChange={onChange}
      />
    
    <br />
    
    <label> Patient allergies :</label>
      <input
        type="text"
        placeholder="Allergies of the Patient"
        name="Allergies"
        value={report.Allergies}
        onChange={onChange}
      />
      <br></br>

      <label> Current other illnesses :</label>
      <input
        type="text"
        placeholder="Illnesses of the Patient currently going on"
        name="Illnesses"
        value={report.Illnesses}
        onChange={onChange}
      />
      <br />
    
    <label> Previous medical info :</label>
      <input
        type="text"
        placeholder="Medical info of the Patient previously taken"
        name="MedInfo"
        value={report.MedInfo}
        onChange={onChange}
      />
      <br />
    
    <label> Any test reports or infection photos :</label>
      <input
        type="file"
        id="imageinput"
        name="file"
        onChange={handleImageChange}
        multiple
        
      />
    
    <button
      type="submit"
      >
      Submit
    </button>
  </form></>);


  return (
    <>
    <Header></Header>
    <div className="container">
     
     <Routes>
      <Route path='/' element={repui}></Route>
      <Route path='/reporthome' element={<Reporthome id={report.PID}></Reporthome>}></Route>
      <Route path='/viewreport/:id' element={<Viewreport images={upimgs} onDeleteImage={handleDeleteImage}></Viewreport>}></Route>
      <Route path='/updatereport' element={<UpdateReport id={report.PID}></UpdateReport>}></Route>
      <Route path='/deletereport' element={<DeleteReport rept={report} ></DeleteReport>}></Route>
      <Route path='/uploads' element={<DisplayUploadedFiles images={upimgs} onDeleteImage={handleDeleteImage}></DisplayUploadedFiles>}></Route>
    </Routes>
            

    
    </div>
    <Footer></Footer>
     </>
  );
};

export default CreateReport;
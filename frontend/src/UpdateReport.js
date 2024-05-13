import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Route, Routes} from 'react-router-dom'
import Reporthome from './reporthome'
import Viewreport from "./viewreport";
import updatecss from './UpdateReport.css'

function UpdateReport(props) {
  const navigate = useNavigate();
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
         .get(`http://localhost:3001/patient/${props.id}`)
         .then((res) => {
           console.log(res.data[0].Age,"dcdc")
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
    if (props.id) {
      getreport();
      console.log(" getreport working")
    }
  }, [props.id]);

  console.log(report)

  const onChange = (e) => {
    setreport({...report, [e.target.name]: e.target.value });
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    await axios
      .put("http://localhost:3001/patient/update", report)
      .then((res) => {
        
        // Push to
      navigate(`/viewreport/${props.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    return (
      <>
      <div className="containerup">
      
            
            <form noValidate onSubmit={onSubmit}>

            <h1>Update Medical Report</h1>
          
              <label> Patient ID :</label>
                <input 
                  type="number"
                  placeholder="ID of the Patient"
                  name="PID"
                  value={report.PID}
                  
                  readonly
                />
              
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
              
              <label> Any test reports :</label>
                <input
                  type="file"
                  name="file"
                  multiple
                  
                />
              
              <button
                type="submit">
                Update
              </button>
            </form>
            </div>
      </>
    );
  }
  
  export default UpdateReport;
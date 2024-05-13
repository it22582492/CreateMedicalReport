import { Link, useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import CreateReport from './ReportForm';
function DeleteReport(props) {
  
    const navigate=useNavigate();
    const onDeleteClick =async () => {
      
        console.log("funtion reached");
        const keysToRemove = Object.keys(localStorage).filter((key) => !key.startsWith('@'));
        keysToRemove.forEach((key) => {
          localStorage.removeItem(key);
        });
        console.log('Uploaded files deleted from local storage.');
    
       await axios
          .delete("http://localhost:3001/patient/delete",{ data: { PID: props.rept.PID } })
          .then((res) => {
            console.log(res.data.deletedCount);
            console.log(props.rept.PID);
            if(res.data.deletedCount){
                navigate('/');

            }
           // 
          })
          .catch((err) => {
            console.log(err);
          });
          window.location.reload();
      };

      const navino=()=>{
        window.history.back();
      }
    return (
      <>
      <div style={{ textAlign: 'center' }}>
  <p style={{ marginBottom: '10px' }}>Are you sure to delete?</p>
  <button type="button" style={{ marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => { onDeleteClick(); }}>Yes</button>
  <button style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}onClick={navino}>No</button>
</div>
      </>
    );
  }
  
  export default DeleteReport;
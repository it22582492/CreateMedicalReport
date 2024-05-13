const express = require('express');
const router = express.Router();
const cors= require('cors')
const app = express();
const Rmodel = require('./patientModel');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

router.get('/test', (req, res) => res.send('report route testing!'));


router.get('/view', (req, res) => {
  Rmodel.find()
    .then(reps => res.json(reps))
    .catch(err => res.json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Rmodel.find({PID:id})
  .then(rep => {
    if (rep.length === 0) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json(rep);
  }
  })
    .catch(err => {
      res.json(err);
    });
});


router.post('/create', (req, res) => {
  const { PID, Name, Age } = req.body;
  if (!PID || !Name || !Age) {
    return res.status(400).json({ error: 'Please provide name, PID, and Age' });
  }

  Rmodel.create(req.body)
    .then(rep => res.json(rep))
    .catch(err => res.json(err));
});


router.put('/update', (req, res) => {
  const {PID}=req.body;
  Rmodel.updateOne({PID}, req.body)
    .then(rep => {if (rep.nModified === 0) {
      return res.status(404).json({ error: 'No record found to update' });
    }
    res.json(rep)})
    
    .catch(err =>
      res.json(err)
    );
});


router.delete('/delete', (req, res) => {
  const {PID}=req.body;
  Rmodel.deleteOne({PID})
    .then(rr =>{
      if (rr.deletedCount === 0) {
        return res.status(404).json({ error: 'No record found to delete' });
      } res.json(rr)})
    .catch(err => res.json(err));
});

module.exports = router;
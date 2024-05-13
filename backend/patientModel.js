const mongoose = require('mongoose');

const M_Reportchema = new mongoose.Schema({
  PID: {
    type: String,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true,
    min:1,
    max:100
  },
  Linfo: {
    type: String
  },
  symptoms: {
    type: String
  },
  Allergies: {
    type: String
  },
  Illnesses: {
    type: String
  },
  MedInfo: {
    type: String
  }
},{ timestamps: true });

module.exports = Rmodel = mongoose.model('Report', M_Reportchema);
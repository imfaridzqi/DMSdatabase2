const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let dateObj = new Date();
let month = dateObj.getUTCMonth();
let date = dateObj.getDate();
let year = dateObj.getFullYear();
let dateNow = date + "/" + month + "/" + year;

const datasetsSchema = new Schema({
  nama: {
    type: String,
  },
  email: {
    type: String,
  },
  handphone: {
    type: String,
  },
  perusahaan: {
    type: String,
  },
  jabatan: {
    type: String,
  },
  ttl: {
    type: Date,
  },
  alamat: {
    type: String,
  },
  status: {
    type: String,
    lowercase: true,
    enum: ["closing", "rapot", "schedule", "refollow up", "program"],
  },
  program: {
    type: String,
    lowercase: true,
    enum: ["ssm", "sdm", "subsidism", "subsididm"],
  },
  keterangan: {
    type: String,
  },
  batch: {
    type: String,
  },
  tglInput: {
    type: String,
    default: dateNow,
  },
  sumber: {
    type: String,
    lowercase: true,
    enum: ["kontak", "whatsapp", "wordpress"],
  },
});

module.exports = mongoose.model("Datasets", datasetsSchema);

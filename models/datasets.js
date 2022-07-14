const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let dateObj = new Date();
let month = dateObj.getMonth();
let date = dateObj.getDate();
let year = dateObj.getFullYear();
let dateNow = year + "-" + month + "-" + date;

const datasetsSchema = new Schema(
  {
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
      enum: ["closing", "rapoo", "schedule", "refollow up", "program", "price"],
    },
    // program: {
    //   type: String,
    //   lowercase: true,
    //   enum: ["ssm", "sdm", "subsidism", "subsididm"],
    // },
    program: {
      type: String,
    },
    keterangan: {
      type: String,
    },
    batch: {
      type: String,
    },
    tglInput: {
      type: String,
    },
    sumber: {
      type: String,
      lowercase: true,
      enum: ["kontak", "whatsapp", "wordpress"],
    },
    concern: {
      type: String,
      lowercase: true,
      enum: ["quality", "cost", "delivery", "service"]
    },
    tglRefollowUp: {
      type: String,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Datasets", datasetsSchema);

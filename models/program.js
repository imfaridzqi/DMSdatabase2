const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programSchema = new Schema(
    {
        kode: {
            type: String
        },
        nama: {
            type: String,
        },
        peserta: {
            type: Schema.Types.ObjectId, ref: "Datasets"
        }
    }
)

module.exports = mongoose.model("Program", programSchema);
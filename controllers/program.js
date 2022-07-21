const Program = require("../models/program");
const ExpressError = require("../utils/ExpressError")

module.exports.index = async (req, res) => {
    const program = await Program.find();
    res.render("program/index", {program})
}

module.exports.renderNewForm = (req, res) => {
    res.render("program/new");
}

module.exports.create = async (req, res) => {
    const nama = req.body.nama;
    const program = new Program({nama});
    await program.save();
    req.flash("success", "Program baru berhasil ditambah");
    res.redirect("/program")
}

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const program = await Program.findById(id);
    res.render("program/edit", {program})
}

module.exports.edit = async(req, res) => {
    const {id} = req.params;
    const program = await Program.findByIdAndUpdate(id, {...req.body.program});
    program.save();
    req.flash("success", "Program berhasil diupdate");
    res.redirect("/program")
}

module.exports.delete = async (req, res) => {
    const {id} = req.params;
    const program = await Program.findByIdAndDelete(id);
    req.flash("success", "Program berhasil dihapus");
    res.redirect("/program")
}
const Datasets = require("../models/datasets");
const csv = require("csvtojson");
const ExpressError = require("../utils/ExpressError");
const xlsx = require("xlsx");
const moment = require("moment");

module.exports.index = async (req, res) => {
  let query = [
    {
      $lookup: {
        from: "datasets",
        localField: "createdAt",
        foreignField: "nama",
        as: "datasets",
      },
    },
  ];

  if (req.query.keyword && req.query.keyword != "") {
    query.push({
      $match: {
        $or: [
          {
            nama: { $regex: req.query.keyword, $options: "i" },
          },
        ],
      },
    });
  }

  if (req.query.program) {
    query.push({
      $match: {
        program: { $regex: req.query.program, $options: "i" },
      },
    });
  }

  if (req.query.batch) {
    query.push({
      $match: {
        batch: req.query.batch,
      },
    });
  }

  if (req.query.status) {
    query.push({
      $match: {
        status: req.query.status,
      },
    });
  }
  if (req.query.concern) {
    query.push({
      $match: {
        concern: req.query.concern,
      },
    });
  }
  if (req.query.sumber) {
    query.push({
      $match: {
        sumber: req.query.sumber,
      },
    });
  }
  if (req.query.tglInput) {
    query.push({
      $match: {
        tglInput: req.query.tglInput,
      }
    })
  }
  let q = req.query;
  let total = await Datasets.countDocuments(query);
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let perPage = req.query.perPage ? parseInt(req.query.perPage) : 30;
  let skip = (page - 1) * perPage;
  query.push({
    $skip: skip,
  });
  query.push({
    $limit: perPage,
  });

  // query.push({
  //   $project: {
  //     _id: 1,
  //     nama: 1,
  //     email: 1,
  //     handphone: 1,
  //     status: 1,
  //   },
  // });

  if (req.query.sortBy && req.query.sortOrder) {
    let sort = {};
    sort[req.query.sortBy] = req.query.sortOrder == "asc" ? 1 : -1;
    query.push({
      $sort: sort,
    });
  } else {
    query.push({
      $sort: { tglInput: -1 },
    });
  }

  let datasets = await Datasets.aggregate(query).sort({ tglInput: -1 });
  let totalPages = Math.ceil(total / perPage);

  res.render('datasets/', {
    datasets,
    page,
    perPage,
    total,
    totalPages,
    q,
  });
};

// module.exports.index = async (req, res) => {
//   res.json(res.paginatedResults);
// };

// module.exports.index = async (req, res) => {
//   const perPage = 5;
//   const page = parseInt(req.query.page);

//   const totalDatasets = await Datasets.countDocuments({});

//   const datasets = await Datasets.find(
//     {},
//     {},
//     {
//       createdAt: -1,
//       skip: perPage * (page - 1),
//       limit: perPage,
//     }
//   );
//   const totalPages = Math.ceil(totalDatasets / perPage);
//   res.send({
//     datasets: datasets,
//     totalPages,
//     currentPage: page,
//     totalDatasets,
//     showingFrom: perPage * (page - 1) + 1,
//     showingUntil:
//       perPage * page > totalDatasets ? totalDatasets : perPage * page,
//   });
// };

// module.exports.index = async (req, res) => {
//   const perPage = 10;
//   const page = parseInt(req.query.page);

//   const totalDatasets = await Datasets.countDocuments({}).exec();

//   const datasets = await Datasets.find()
//     .sort({ createdAt: -1 })
//     .skip(perPage * (page - 1))
//     .limit(perPage);

//   const totalPages = Math.ceil(totalDatasets / perPage);
//   res.send({
//     datasets: datasets,
//     totalPages,
//     currentPage: page,
//     totalDatasets,
//     showingFrom: perPage * (page - 1) + 1,
//     showingUntil:
//       perPage * page > totalDatasets ? totalDatasets : perPage * page,
//   });
// };

module.exports.renderNewForm = (req, res) => {
  res.render("datasets/new");
};

module.exports.create = async (req, res) => {
  if (!req.body.datasets) throw new ExpressError("Invalid Data", 400);
  const tglInput = req.body.tglInput;
  const datasets = new Datasets({ ...req.body.datasets, tglInput });

  await datasets.save();
  req.flash("success", "Data berhasil ditambah");
  res.redirect("/datasets");
};

let temp;

module.exports.uploadCSV = (req, res) => {
  //convert csvfile to jsonArray
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      console.log(jsonObj);
      for (let x = 0; x < jsonObj; x++) {
        temp = parseFloat(jsonObj[x].nama);
        jsonObj[x].nama = temp;
        temp = parseFloat(jsonObj[x].email);
        jsonObj[x].email = temp;
        temp = parseFloat(jsonObj[x].handphone);
        jsonObj[x].handphone = temp;
        temp = parseFloat(jsonObj[x].perusahaan);
        jsonObj[x].perusahaan = temp;
        temp = parseFloat(jsonObj[x].jabatan);
        jsonObj[x].jabatan = temp;
      }
      Datasets.insertMany(jsonObj, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/datasets");
        }
      });
    });
};

module.exports.exportCSV = (req, res) => {
  var wb = xlsx.utils.book_new();
  Datasets.find((err, query) => {
    if (err) {
      console.log(err);
    } else {
      var temp = JSON.stringify(query);
      temp = JSON.parse(temp);
      var ws = xlsx.utils.json_to_sheet(temp);

      let dateObj = new Date();
      let month = dateObj.getMonth() + 1;
      let date = dateObj.getDate();
      let year = dateObj.getFullYear();
      let dateNow = date + "-" + month + "-" + year;

      var down = __dirname + `/${dateNow}.xlsx`;
      xlsx.utils.book_append_sheet(wb, ws, "sheet1");
      xlsx.writeFile(wb, down);
      res.download(down);
    }
  });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const datasets = await Datasets.findById(id);
  res.render("datasets/edit", { datasets });
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const datasets = await Datasets.findByIdAndUpdate(id, {
    ...req.body.datasets
  });
  const body = { ...req.body.datasets };
  if (body.status != "refollow up") {
    datasets.tglRefollowUp = "";
  }
  datasets.save();
  req.flash("success", "Data berhasil diupdate");
  res.redirect("/datasets");
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const datasets = await Datasets.findByIdAndDelete(id);
  req.flash("success", "Data berhasil dihapus");
  res.redirect("/datasets");
};

module.exports.renderAturJadwalForm = async (req, res) => {
  const { id } = req.params;
  const datasets = await Datasets.findById(id);
  res.render("datasets/aturJadwal", { datasets });
};

module.exports.aturJadwal = async (req, res) => {
  const { id } = req.params;
  const tglRefollowUp = req.body.tglRefollowUp;
  // console.log(req.body.tglRefollowUp)
  // console.log(tglRefollowUp)
  const datasets = await Datasets.findByIdAndUpdate(id, {tglRefollowUp});
  datasets.save();
  req.flash("success", "Jadwal Re-Follow Up telah diatur");
  res.redirect("/datasets");
};

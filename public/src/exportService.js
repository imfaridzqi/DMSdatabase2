const xlsx = require("xlsx");
const path = require("path");

const exportExcel = (data, workSheetColumnName, workSheetName, filePath) => {
  const workBook = xlsx.utils.book_new();
  const workSheetData = [workSheetColumnName, ...data];
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, path.resolve(filePath));
};

const exportUserToExcel = (
  users,
  workSheetColumnName,
  workSheetName,
  filePath
) => {
  const data = users.map((user) => {
    return [
      user.nama,
      user.email,
      user.handphone,
      user.perusahaan,
      user.program,
      user.batch,
      user.status,
    ];
  });
  exportExcel(data, workSheetColumnName, workSheetName, filePath);
};

module.exports = exportUserToExcel;

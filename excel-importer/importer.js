const readXlsxFile = require('read-excel-file/node');
const fs = require("fs");

// Config...
const columns = [
  "title",
  "address", "address",
  "lat",
  "lng",
  "area", "area", "area", "area", "area", "area",
  "support", "support", "support", "support",
  "phone",
  "fax",
  "mail",
  "link", "link",
  "lead",
  "carrier",
  "offer", "offer", "offer", "offer", "offer", "offer", "offer", "offer"
];
const specialColumns = ["offer", "link", "support", "area", "address", "lat", "lng"];

// Output...
const entries = [];
const offers = [];

// Main Function...
(async function () {
  const rows = await readXlsxFile(process.env.file);
  rows.splice(0, 2);
  rows.forEach(handleRow);
  writeOutput();
})();

function handleRow(row, rowIndex) {
  if (row[0] && row[3] && row[4]) {
    let entry = {};
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cellValue = row[columnIndex];
      const key = columns[columnIndex];
      if (!specialColumns.includes(key)) {
        entry[key] = cellValue;
      } else {
        handleSpecialColumn(entry, key, columnIndex, row, cellValue);
      }
    }
    if (Object.keys(entry).length) {
      entries.push(entry);
    }
  } else {
    console.log("[importer] Skip row: ", rowIndex);
  }
}

function handleSpecialColumn(entry, key, columnIndex, row, cellValue) {
  switch (key) {
    case "address":
      if (entry[key]) {
        entry[key] = cellValue + ", " + entry[key];
      } else {
        entry[key] = cellValue;
      }
      break;
    case "area":
      const areas = {
        5: "north",
        6: "east",
        7: "south",
        8: "west",
        9: "middle",
        10: "all"
      };
      if (cellValue) {
        entry["schoolArea"] = areas[columnIndex];
      }
      break;
    case "support":
      const supports = {
        11: 1,
        12: 3,
        13: 0,
        14: 2
      };
      if (!entry["supportOptions"]) entry["supportOptions"] = [];
      if (cellValue) {
        entry["supportOptions"].push(supports[columnIndex]);
      }
      break;
    case "link":
      if (!entry["link"]) entry["link"] = [];
      if (cellValue) {
        entry["link"].push(cellValue);
      }
      break;
    case "lat":
      entry["lat"] = Number(cellValue);
      break;
    case "lng":
      entry["lng"] = Number(cellValue);
      break;
    case "offer":
      if (!entry["offers"]) entry["offers"] = [];
      if (cellValue) {
        const id = offers.length;
        entry["offers"].push(id);
        offers.push({id, title: cellValue});
      }
      break;
    default:
      throw new Error("Unknown key '" + key + "'");
  }
}

function writeOutput() {

  console.log("[importer] Writing entries to: ", process.env.outputFile);
  const entriesFileContent = `export default ${JSON.stringify(entries)};`;
  fs.writeFileSync(process.env.outputFile, entriesFileContent);

  console.log("[importer] Writing offers to: ", process.env.offersOutputFile);
  const offersFileContent = `export default ${JSON.stringify(offers)};`;
  fs.writeFileSync(process.env.offersOutputFile, offersFileContent);
}

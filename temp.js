const fs = require('fs');

function loadCsv(filePath) {
  // Read the file
  const data = fs.readFileSync(filePath, 'utf8');

  // Split the file into lines
  const lines = data.split("\n");

  // Initialize the output array
  const output = [];

  // Loop through each line and split it into fields
  lines.forEach((line) => {
    const fields = line.split(",");
    output.push(fields);
  });

  return output;
}

const csvData = loadCsv('miro_extension/tshirt-data.csv');
console.log(csvData);
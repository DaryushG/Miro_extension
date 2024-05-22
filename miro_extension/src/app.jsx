import * as React from 'react';
import {createRoot} from 'react-dom/client';

import '../src/assets/style.css';

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





async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: csvData[2][1],
  });

  await miro.board.viewport.zoomTo(stickyNote);
}

const App = () => {
  React.useEffect(() => {
    addSticky();
  }, []);

  

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <h1>Design Studio</h1>
        <p>Upload a CSV file to get started!</p>
        
      </div>
      <div className="cs1 ce12">
        <form>
          <input type="file" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

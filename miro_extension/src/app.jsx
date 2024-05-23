import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Papa from 'papaparse'; 
import '../src/assets/style.css';

let csvData = null;
async function handleFileUpload(event) {
  const file = event.target.files[0]; 
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function(event) {
    const csvText = event.target.result; 
    Papa.parse(csvText, {
      complete: function(results) {
        csvData = results.data; 
      }
    });
  };
  reader.readAsText(file); 

  
}

async function createMap() {
  console.log(csvData)
  addFrame(csvData.length.toString());
  addSticky();
  addText(); 
}

async function addSticky(word = '') {
  const stickyNote = await miro.board.createStickyNote({
    content: word,
  });
}



async function addText(word = ''){
  const caption = csvData[1][2]; 
  console.log(caption) 
  const text = await miro.board.createText({
    content: `<p>${caption}</p>`,
    style: {
      color: '#1a1a1a', // Default value: #1a1a1a (black)
      fillColor: 'transparent', // Default value: transparent (no fill)
      fillOpacity: 1, // Default value: 1 (solid color)
      fontFamily: 'ariel', // Default font type for the text
      fontSize: 20, // Default font size
      textAlign: 'left', // Default alignment: left
    },
    x: 0,
    y: 0,
    width: 720,
    // 'height' is calculated automatically, based on 'width'
    rotation: 0, // The text item is upside down on the board
  });
  
  // Output the created item to the developer console
  console.log(text);
}

async function addItem(content){
  
}

async function addCaption(){

}

async function addImage(){

}

async function addTitle(){

}


async function addFrame(content) {
  const frame = await miro.board.createFrame({
    title: csvData.length.toString(),
    style: {
      fillColor: '#ffffff',
    },
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: 800,
    height: 450,
  });
}

const App = () => {
  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <h1>Design Studio</h1>
        <p>Upload a CSV file to get started!</p>
        
      </div>
      <div className="cs1 ce12">
        <form>
          <input type="file" onChange={handleFileUpload} /> {}
          <button type="button" onClick={createMap}>Submit</button> {}
        </form>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

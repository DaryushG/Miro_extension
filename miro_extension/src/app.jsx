import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Papa from 'papaparse'; 
import '../src/assets/style.css';

let frameW = null;
let frameL = null;

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

let items = [];
async function createMapV() {
  let lengthScale = Math.floor((csvData.length / 4) + 1);
  frameL = 900 * lengthScale; 
  frameW = 600 * 4;
  mainFrame(csvData.length.toString());
  let countX = 0;
  let countY = 0;
  for (let i = 0; i < csvData.length; i++) {
    items[i] = await frame();
    items[i].add(await card(csvData[i][1]));
    items[i].y = items[i].y - (900 * lengthScale / 2 - 450) + 900 * countY;
    items[i].sync();
    if (countX <= 1) {
      items[i].x = items[i].x - 600 * countX - 300;
      items[i].sync();
      countX = countX + 1;
      
    }
    else {
      items[i].x = items[i].x - 300 - (1 - countX) * 600;
      items[i].sync();
      if (countX == 3) {
        countX = 0;
        countY = countY + 1;
      }
      else {
        countX = countX + 1;
      }
    }
  }
}

async function card(content = '') {
  const frame = await miro.board.createCard({
    title: content,
  });
  return frame;
}

async function frame(content = '') {
  let dyanmicW = 600;
  let dyanmicL = 900;

  const frame = await miro.board.createFrame({
    style: {
      fillColor: '#2596be',
    },
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: dyanmicW,
    height: dyanmicL, 
  });
  return frame;
}

async function mainFrame(content = '') {
  const frame = await miro.board.createFrame({
    title: csvData.length.toString(),
    style: {
      fillColor: '#555555',
    },
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: frameW,
    height: frameL,
  });
}

async function addSticky(word = '') {
  const stickyNote = await miro.board.createStickyNote({
    content: word,
  });
}



async function addText(word = ''){
  const caption = csvData[1][2]; 
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
    width: 240,
    // 'height' is calculated automatically, based on 'width'
    rotation: 0, // The text item is upside down on the board
  });
  
  // Output the created item to the developer console
  return text;
}

async function addItem(content){
  
}

async function addCaption(){

}

async function addImage(imageUrl = '') {
  const image = await miro.board.createImage({
    title: 'This is an image',
    url: 'https://miro.com/blog/wp-content/uploads/2023/10/Frame-12772209-1536x806.png',
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: 800, // Set either 'width', or 'height'
    rotation: 0.0,
  });
  
  // Output the created item to the developer console
  console.log(image);
}

async function addTitle(){

}




const App = () => {
  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <h1>Spectrand Extension</h1>
        <p>Upload a CSV file to get started!</p>
        
      </div>
      <div className="cs1 ce12">
        <form>
          <input type="file" onChange={handleFileUpload} /> {}
          <button type="button" onClick={createMapV}>Submit</button> {}
        </form>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

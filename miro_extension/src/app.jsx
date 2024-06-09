import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Papa from 'papaparse'; 
import '../src/assets/style.css';
import products from '../new_data.json'



console.log(products[0].product_name); 

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
  let lengthScale = Math.floor((products.length / 4) + 1);
  frameL = 900 * lengthScale; 
  frameW = 900 * 4;
  mainFrame(csvData.length.toString());
  // await addText(csvData[2][2], posx = 0, posy = 30);

  console.log(csvData);

  let countX = 0;
  let countY = 0;

 
  for (let i = 0; i < products.length; i++) {
    items[i] = await frame();
    items[i].add(await addText(products[i].product_name));
    items[i].add(await card(`Type: ${products[i].product_type}`));
    items[i].add(await card(`Price: ${products[i].price.toString()}, Currency: ${products[i].currency}`));
    items[i].add(await card(`Quantity: ${products[i].quantity.toString()}`));
    if (items[i].brand == ""){
        items[i].add(await card('Brand: N/A')); 
    }

    else {
      items[i].add(await card(`Brand: ${products[i].brand}`));
    }


    items[i].add(await card(`Sizes: ${products[i].sizes}`));
    items[i].add(await card(`Floorset: ${products[i].floorset}`));
    for (let j = 0; j < products[i].colorways.length; j++){
      items[i].add(await color_tile('', products[i].colorways[j].hex));

    }
    // let hex = '#000000'

    // try {
    //   hex = products[i].colorways[0].hex; 
    // } catch (error) {
    //   hex = '#000000'; 
    // }


    // try {
    //   items[i].add(await color_tile('', hex));
    // } catch (error) {
    //   items[i].add(await addText('No colorway available')); 
    // }

    
    items[i].add(await addImage());
    

   
    


    items[i].y = items[i].y - (900 * lengthScale / 2 - 450) + 900 * countY;
    items[i].sync();

   
    // if (i == 0){
    //   children = items[i].children; 
    //   console.log(children); 
    // }
    
    if (countX <= 1) {
      items[i].x = items[i].x - 900 * countX - 450 ;
      items[i].sync();
      countX = countX + 1;
      
    }
    else {
      items[i].x = items[i].x - 450 - (1 - countX) * 900  ;
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

  for (let i = 0; i < items.length; i++){

    try {
      let children = await items[i].getChildren(); 
      if (children && children.length > 1) {
        children[children.length-1].y -= 120;
        children[children.length-1].x -= 230; 
        children[children.length-1].sync(); 

        children[0].y -= 370;
        children[0].x -= 230; 
        children[0].sync(); 

        children[1].y -= 300; 
        children[1].x += 180; 
        children[1].sync();

        children[2].y -= 210;
        children[2].x += 180; 
        children[2].sync(); 

        children[3].y -= 120; 
        children[3].x += 180;
        children[3].sync()

        children[4].y -= 30;
        children[4].x += 180; 
        children[4].sync()

        children[5].y += 60;
        children[5].x += 180; 
        children[5].sync()

        children[6].y += 150;
        children[6].x += 180; 
        children[6].sync()

        let i = 7;
        let xVal = 80; 

        while (i < children.length-1){
          children[i].y += 240
          children[i].x += xVal; 
          children[i].sync(); 
          i += 1; 
          xVal += 65; 

        }






      } else {
        console.log('Not enough children');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }



}

async function card(content = 'N/A') {
  const frame = await miro.board.createCard({
    title: content,
  });
  return frame;
}

async function color_tile(content = 'N/A', tile_color = '#ff0000'){
  const frame = await miro.board.createShape({
    content: '',
    shape: 'round_rectangle',
    style: {
      color: tile_color, // Default text color: '#1a1a1a' (black)
      fillColor: tile_color, // Default shape fill color: transparent (no fill)
      fontFamily: 'arial', // Default font type for the text
      fontSize: 14, // Default font size for the text, in dp
      textAlign: 'center', // Default horizontal alignment for the text
      textAlignVertical: 'middle', // Default vertical alignment for the text
      borderStyle: 'normal', // Default border line style
      borderOpacity: 1.0, // Default border color opacity: no opacity
      borderColor: tile_color, // Default border color: '#ffffff` (white)
      borderWidth: 2, // Default border width
      fillOpacity: 1.0, // Default fill color opacity: no opacity
    },
    x: 0, // Default value: center of the board
    y: 0, // Default value: center of the board
    width: 60,
    height: 50,
  });
  return frame; 
}

async function frame(content = '') {
  let dyanmicW = 850;
  let dyanmicL = 850;

  const frame = await miro.board.createFrame({
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    style: {
      fillColor: '#FFFFFF', // Default value: transparent (no fill)
    },
    width: dyanmicW,
    height: dyanmicL, 
  });
  return frame;
}

async function mainFrame(content = '') {
  const frame = await miro.board.createFrame({
    title: csvData.length.toString(),
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
  const text = await miro.board.createText({
    content: `<p>${word}</p>`,
    style: {
      color: '#1a1a1a', // Default value: #1a1a1a (black)
      fillColor: 'transparent', // Default value: transparent (no fill)
      fillOpacity: 1, // Default value: 1 (solid color)
      fontFamily: 'ariel', // Default font type for the text
      fontSize: 20, // Default font size
      textAlign: 'center', // Default alignment: left
    },
    x: 0,
    y: 0,
    width: 300,
    // 'height' is calculated automatically, based on 'width'
    rotation: 0, // The text item is upside down on the board
  });
  
  // Output the created item to the developer console
  return text;
}


async function addImage(imageUrl = '') {
  const image = await miro.board.createImage({
    title: 'This is an image',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNi_MTwBGCcXILrIY4B1tEvmPiU_V1DAfimQ&s',
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: 350, // Set either 'width', or 'height'
    rotation: 0.0,
  });
  
  // Output the created item to the developer console
  return image;
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
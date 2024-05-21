import * as React from 'react';
import {createRoot} from 'react-dom/client';

import '../src/assets/style.css';

async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: '',
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

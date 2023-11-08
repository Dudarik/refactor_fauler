import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import invoices from './data/invoices.json';
import palys from './data/plays.json';
import { statement } from './lib';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {JSON.stringify(invoices)}
      <ul>
        {Object.entries(palys).map((item) => (
          <li>
            {JSON.stringify(item[0])} |||| {JSON.stringify(item[1])}
          </li>
        ))}
      </ul>
      <div className='result'>
        <pre>
          {invoices.map((invoice) => JSON.stringify(statement(invoice, palys)))}
        </pre>
      </div>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

import { useEffect } from 'react'
import io from 'socket.io-client'
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    io("ws://localhost:8080", {
      reconnectionDelayMax: 10000,
      auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTYxNDUxMDkwNH0.iHJfC1k01HK9-DqGNyZReiGC6uHkmXghBivELtBxTgQ"
      },
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

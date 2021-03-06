import logo from './logo.svg';
import './App.css';
import {useBlockedServices} from "./useBlockedServices.js";

const BlockedWidget = ({ isBlocked, loading }) => {
  if (loading) {
    return <p>🕰 Loading...</p>

  }
  if (!isBlocked) {
    return (
      <div>
        No blocking in place
      </div>
    )

  }

  return <div>Blocking in place!</div>
}

function App() {
  const blockedServices = useBlockedServices()

  return (
    <div className="App">
      <BlockedWidget loading={!blockedServices} isBlocked={blockedServices?.blocker} />
    </div>
  );
}

export default App;

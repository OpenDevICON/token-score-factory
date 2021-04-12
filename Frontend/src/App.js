import './App.css';
import CreatePage from './Pages/CreatePage';
import { Container } from 'react-bootstrap';
import { NotificationContainer } from 'react-notifications';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import { useState } from 'react';
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from 'Pages/HomePage';

function App() {

  const location = useLocation();
  const [walletAddress, setWalletAddress] = useState(null);
  return (
    <div style={{ width: '100%', minHeight: '100%', backgroundColor: location.pathname === '/create'?'#EDEDED':'white'}} >
        <Container fluid>
          <Header walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
          <Switch>
            <Route path="/create">
              <CreatePage walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>

        </Container>
        <Footer />


        <NotificationContainer />
    </div>
  );
}

export default App;

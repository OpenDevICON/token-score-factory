import './App.css';
import CreatePage from './Pages/CreatePage';
import { Container, Modal } from 'react-bootstrap';
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
  const maintenanceMode = true;
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

        <Modal backdropClassName='maintenance-backdrop' className='maintenance-modal' centered show={maintenanceMode}>
          <Modal.Body>
            <div className="body-content">
              <h3>Site under maintenance...</h3>
              <p className="maintenance-msg">Python contracts are not accepted currently in ICON mainnet. Token Score Factory will be live soon with Java contracts.</p>
            </div>
          </Modal.Body>
        </Modal>


        <NotificationContainer />
    </div>
  );
}

export default App;

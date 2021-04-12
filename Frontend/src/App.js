import './App.css';
import CreatePage from './Pages/CreatePage';
import { Container } from 'react-bootstrap';
import { NotificationContainer } from 'react-notifications';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from 'Pages/HomePage';

function App() {

  const [walletAddress, setWalletAddress] = useState(null);
  return (
    <div style={{ width: '100%', minHeight: '100%' }} >
      <Router>
        <Container fluid>
          <Header walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
          <Switch>
            <Route path="/create">
              <CreatePage walletAddress={walletAddress} setWalletAddress={setWalletAddress} style = {{backgroundColor: '#EDEDED'}} />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>

        </Container>
        <Footer />


        <NotificationContainer />
      </Router>
    </div>
  );
}

export default App;

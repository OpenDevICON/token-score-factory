import './App.css';
import CreatePage from './Pages/CreatePage';
import { Container } from 'react-bootstrap';
import { NotificationContainer } from 'react-notifications';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import { useState } from 'react';

function App() {

  const [walletAddress, setWalletAddress] = useState(null);
  return (
    <div style={{ backgroundColor: '#EDEDED', width: '100%', minHeight: '100%' }} >
      <Container fluid>
        <Header walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
        <CreatePage walletAddress={walletAddress} setWalletAddress={setWalletAddress} />

      </Container>
      <Footer />


      <NotificationContainer />
    </div>
  );
}

export default App;

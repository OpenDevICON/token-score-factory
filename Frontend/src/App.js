import './App.css';
import CreatePage from './Pages/CreatePage';
import {Container} from 'react-bootstrap';
import {NotificationContainer} from 'react-notifications';
import Footer from 'Components/Footer';

function App() {
  return (
    <div style = {{backgroundColor: '#EDEDED', width: '100%', minHeight: '100%'}} >
          <Container fluid>
            <CreatePage/>


          </Container>
          <Footer />


          <NotificationContainer />
    </div>
  );
}

export default App;

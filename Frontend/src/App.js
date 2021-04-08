import './App.css';
import CreatePage from './Pages/CreatePage';
import {Container} from 'react-bootstrap';
import {NotificationContainer} from 'react-notifications';

function App() {
  return (
    <div style = {{backgroundColor: '#EDEDED', width: '100%', minHeight: '100%'}} >
          <Container fluid>
          <CreatePage/>

          </Container>

          <NotificationContainer />
    </div>
  );
}

export default App;

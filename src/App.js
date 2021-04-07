import './App.css';
import Home from './Pages/home';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <div style = {{backgroundColor: '#EDEDED', width: '100%', minHeight: '100%'}} >
          <Container fluid>
          <Home/>

          </Container>
    </div>
  );
}

export default App;

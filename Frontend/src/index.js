import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Assets/styles/form.scss';
import './Assets/styles/all.scss';
import './Assets/styles/header.scss'
import './Assets/styles/footer.scss';
import './Assets/styles/homepagecontent.scss';
import './Assets/styles/faq.scss';
import './Assets/styles/homepageheader.scss';
import './Assets/styles/selectwalletmodal.scss';
import './Assets/styles/deployresultmodal.scss';
import 'react-notifications/lib/notifications.css';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

 import TrasactionList from './components/transactionlist.component';
 import TransactionDetail from './components/transactiondetail.component';

function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path = "/" exact component={TrasactionList}/>
        <Route path = "/detail/:id"  component={TransactionDetail}/>
      </div>
    </Router>
  );
}

export default App;

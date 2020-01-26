import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './transactionlist.css'

const Loading =()=>
    <div className="center">
      <span className="ouro ouro3">
      <span className="left"><span className="anim"></span></span>
      <span className="right"><span className="anim"></span></span>
      </span>  
    </div>


const Transaction = props => (
  <tr>
    <td><Link to={"/detail/"+props.transaction.account}>{props.transaction.account}</Link></td>
    <td>{props.transaction.accountName}</td>
    <td>{props.transaction.currencyCode}</td>
    <td>{props.transaction.amount}</td>
    <td>{props.transaction.transactionType}</td>
  </tr>
)

export default class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/transactions/')
      .then(response => {
         this.setState({ loading: false, transactions: response.data.transactions })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  transactionList() {
    return this.state.transactions.map(currenttransaction => {
      return <Transaction transaction={currenttransaction} key={currenttransaction.accountNumber}/>;
    })
  }

  render() {
    let data;
    if (this.state.loading) {
      data = <Loading  />
    } 
    else {
      data = this.transactionList() ;}
    return (
      
      <div className="container">
        
        
        <h3>My Transactions</h3>
        <div className="filter_style">filter</div>
        <div className="transaction_style" >
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody>
          
            {data}
            
          </tbody>
        </table>
        </div>
   
      </div>
    )
  }
}
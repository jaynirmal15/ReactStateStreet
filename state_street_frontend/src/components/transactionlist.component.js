import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './transactionlist.css';

const filterAccounts = [ 'Savings Account','Checking Account', 'Auto Loan Account',
               'Credit Card Account', 'Investment Account', 'Personal Loan Account',
              'Money Market Account', 'Home Loan Account'];
const transactiontype = ['deposit', 'withdrawal', 'invoice', 'payment'];


const ListItems = props => 
  filterAccounts.map(account =>
          <div className='filter-per-checkbox'>
            <input type="checkbox" className="form-check-input" id="exampleCheck1" value={account} onChange={props.onChangeAccount}/>
            <label className="form-check-label form-personal" for="exampleCheck1">{account}</label>
          </div>
 )

const ListTransactions = props=>
  transactiontype.map(transaction =>
    <div className='filter-per-checkbox'>
      <input type="checkbox" className="form-check-input" id="exampleCheck1" value={transaction} onChange={props.onChangeAccount} />
      <label className="form-check-label form-personal" for="exampleCheck1">{transaction}</label>
    </div>
)

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
      checkedAccountOptions : [],
      checkedTransactionOptions : [],
      transactions: [],
      loading: true,
    };
   this.onChangeAccount = this.onChangeAccount.bind(this);
   this.checkedAccTran = this.checkedAccTran.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/transactions/')
      .then(response => {
         this.setState({ loading: false, transactions: response.data.transactions,tr : response.data.transactions })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  checkedAccTran = (trans) => {
    if(this.state.checkedAccountOptions[0] && this.state.checkedTransactionOptions[0]){
      return this.state.checkedAccountOptions.includes(trans.accountName) && this.state.checkedTransactionOptions.includes(trans.transactionType);
    }
    else if(this.state.checkedAccountOptions[0]){
      return this.state.checkedAccountOptions.includes(trans.accountName);
    }
    else if(this.state.checkedTransactionOptions[0]){
      return this.state.checkedTransactionOptions.includes(trans.transactionType);
    }
    else{
      return true;
    }
  }
  
  onChangeAccount = (e)=>{
    const accountOptions = this.state.checkedAccountOptions;
    const transactionOptions = this.state.checkedTransactionOptions;
    let index;
    if(filterAccounts.includes(e.target.value)){
      if(e.target.checked){
      accountOptions.push(e.target.value)
    }
    else {
      index = accountOptions.indexOf(e.target.value)
      accountOptions.splice(index, 1)
    }
    }
    else if(transactiontype.includes(e.target.value)){
      if(e.target.checked){
        transactionOptions.push(e.target.value)
      }
      else {
        index = transactionOptions.indexOf(e.target.value)
        transactionOptions.splice(index, 1)
      }
    } 
    this.setState({loading : true,checkedAccountOptions: accountOptions, checkedTransactionOptions : transactionOptions});
      axios.get('http://localhost:5000/transactions/')
      .then(response => {
        const tranArray = response.data.transactions.filter(trs => this.checkedAccTran(trs));
        this.setState({loading: false, transactions :tranArray });
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
        <h3 className="my_transactions">My Transactions</h3>
        <div className="filter_style">
          <span className="filters">Filters</span>
          <div className='filterCheckbox'>
            <div className="accountName">
              Account Name
            </div>
            <ListItems onChangeAccount={this.onChangeAccount}/>
          </div>
          <div className='filterCheckbox'>
            <div className="accountName">
              Transaction Type
            </div>
            <ListTransactions onChangeAccount={this.onChangeAccount}/>
          </div>
        </div>
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
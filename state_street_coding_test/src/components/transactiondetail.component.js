import React, { Component } from 'react';
import axios from 'axios';

export default class TransactionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountNumber: '',
      accountType: '',
      currency: '',
      amount: 0,
      transactionType:''
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    axios.get('http://localhost:5000/transactions/'+this.props.match.params.id)
      .then(response => {
        
        this.setState({
          accountNumber: response.data[0].account,
          accountType: response.data[0].accountName,
          currency: response.data[0].currencyCode,
          amount: response.data[0].amount,
          transactionType : response.data[0].transactionType
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  render() {
    return (
    <div>
      <h3>Transaction Detail</h3>
      <form >
        <div className="form-group"> 
          <label>Account Number: </label>
          <input   type="text"
              required
              className="form-control"
              value={this.state.accountNumber}
              disabled/>
        </div>
        <div className="form-group"> 
          <label>Account Type: </label>
          <input   type="text"
              required
              className="form-control"
              value={this.state.accountType}
              disabled/>
        </div>
        <div className="form-group">
          <label>Currency </label>
          <input disabled="true"
              type="text" 
              className="form-control"
              value={this.state.currency}
              />
        </div>
        <div className="form-group">
          <label>Amount </label>
          <div>
          <input disabled="true"
              type="text" 
              className="form-control"
              value={this.state.amount}
              />
          </div>
        </div>
        <div className="form-group">
          <label>Transaction Type </label>
          <div>
          <input disabled="true"
              type="text" 
              className="form-control"
              value={this.state.transactionType}
              />
          </div>
        </div>
      </form>
    </div>
    )
  }
}
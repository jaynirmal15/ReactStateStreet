# ReactStateStreet
State Street Application

Explanation:- The project is divided into two parts:- 
1. Front-end :- React Application
2. Backend :- Node.js

Front-end React Application :-
The application consists of 5 components:- 2 State Components and 3 Stateless Components
State Components:- 
1. Transactions List Component :- This component diplays the entire list of Transactions by calling the API and storing the transactions in state. The buffer time of API call is diplay by stateless loading component.
2. Transaction Detail Component :- The detail of a particular transaction is display via Transaction Detail Component. When the user clicks on an account number, they are redirected to transaction detail page by passing the account number to the component and then calling the callDetail API to fetch the details of that particular transaction

Stateless Components:- 
1. The Loading Component :-  It consists of the loading UI including the spinner
2. Account Type Component :- It consists of checkboxes of Account Types for eg:- Savings Account, Checkinng Account,etc.
3. Transaction Type Component :- It conists of checkboxes of Transaction Type fo eg:- detail, withdrawal, etc.
As both Account and Transaction Types are static variables, I have created to arrays storing the name of all Accounts and Transaction Types to display and filter dynamically. The reason for using this approach is because if in future we need to add another filter option in future, we can just add its name to the arraylist and it will filter it out dynamically without any more code to be written.

Excecution:-
To execute backend part :-
1. cd REACTSTATESTREET
2. cd state_street_backend
3. npm install
4. nodemon server

To execute front-end part :-
1. cd state_street_frontend
2. npm install
3. npm start

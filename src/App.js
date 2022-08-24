import logo from './logo.svg';
import './App.css';
import List from "./components/List";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import {v4 as uuid} from 'uuid'
import {useState, useEffect} from "react";

// const initialExpenses = [
//   {id: uuid(), charge: 'rent', amount: 1600},
//   {id: uuid(), charge: 'car payment', amount: 400},
//   {id: uuid(), charge: 'credit card bill', amount: 1200}
// ];

const initialExpenses = localStorage.getItem('expenses') ?
  JSON.parse(localStorage.getItem('expenses')) : [];


function App() {
  //*************** state values **************
  //all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState('')
  //single amount
  const [amount, setAmount] = useState('')
  //alert
  const [alert, setAlert] = useState({show: false})
  //edit
  const [edit, setEdit] = useState(false)
  //edit item
  const [id, setId] = useState(0);
  //*************** useEffect **************
  // 每次渲染后都会调用~
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);//当expenses改变时才调用useEffect
  //*************** functionality **************
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  //handle Alert
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false})
    }, 3000)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          //很重要！
          return item.id === id ? {...item, charge, amount} : item;
        })
        setExpenses(tempExpenses);
        setEdit(false);
      } else {
        const singleExpense = {
          id: uuid(), charge, amount: amount
        };
        setExpenses([...expenses, singleExpense])
      }
      setCharge('');
      setAmount('');
      //提醒用户输入完成
      handleAlert({type: 'success', text: 'item added!'})
    } else {
      //handle alert called
      handleAlert({
        type: 'danger', text: 'charge can`t be empty value and amount value' +
          ' has to be bigger than 0!'
      })
    }
  }
  //clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({type: "danger", text: "all item deleted!"})
  };
  //handle deleteSingleItem
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type: "danger", text: "item deleted!"})
  }
  //handle editSingleItem
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <h1>budget calculator</h1>
      <main className={"App"}>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <List
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending:<span className={"total"}>
        ${expenses.reduce((acc, curr) => {
        return acc += parseInt(curr.amount)
      }, 0)}
      </span>
      </h1>
    </>
  );
}

export default App;

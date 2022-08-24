import React from 'react';
import Item from "./ExpenseItem";
//React Icons
import {MdDelete} from "react-icons/md";
import {clear} from "@testing-library/user-event/dist/clear";

function List(props) {
  const {expenses, handleDelete, handleEdit, clearItems} = props;
  return (
    <>
      <ul className={"list"}>
        {expenses.map((expense) => {
          return <Item key={expense.id} expense={expense}
                       handleDelete={handleDelete} handleEdit={handleEdit}></Item>
        })}
      </ul>
      {expenses.length > 0 && <button className={"btn"} onClick={clearItems}>
        CLEAR EXPENSES
        <MdDelete className={"btn-icon"}/>
      </button>}
    </>
  );
}

export default List;
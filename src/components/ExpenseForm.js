import React from 'react';
import {MdSend} from "react-icons/md";

function ExpenseForm(props) {
  const {charge, amount, handleCharge, handleAmount, handleSubmit, edit} = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            id="charge"
            name="charge"
            className="form-control"
            placeholder="e.g. rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="form-control"
            placeholder="e.g. rent"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? "edit" : "submit"}
        <MdSend className='btn-icon'/>
      </button>
    </form>
  );
}

export default ExpenseForm;
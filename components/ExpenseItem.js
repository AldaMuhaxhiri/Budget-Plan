// ExpenseItem.js
import React, { useContext, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
  const { dispatch } = useContext(AppContext);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

  const handleDeleteExpense = () => {
    if (!isDeleteConfirmed) {
      const isConfirmed = window.confirm('Are you sure you want to delete this?');
      if (isConfirmed) {
        setIsDeleteConfirmed(true);  // Set a flag to indicate deletion is confirmed
        dispatch({
          type: 'DELETE_EXPENSE',
          payload: props.id,
        });
      }
    }
  };

  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <div>
        {props.name}
      </div>
      <div>
        <span className='badge badge-primary badge-pill mr-3'>£{props.cost}</span>
        <TiDelete size='1.5em' onClick={handleDeleteExpense} />
      </div>
    
    </li>
  );
};

export default ExpenseItem;

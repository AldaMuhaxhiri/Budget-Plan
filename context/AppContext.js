import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

// 5. The reduceer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return {
				...state,
				expenses: [...state.expenses, action.payload],
			};
		case 'DELETE_EXPENSE':
            const isConfirmed = window.confirm('Are you sure you wanna delete this?');
            if (!isConfirmed){
                return state;
            }
			return {
				...state,
				expenses: state.expenses.filter(
					(expense) => expense.id !== action.payload
				),
			};
		case 'SET_BUDGET':
			return {
				...state,
				budget: action.payload,
			};

		default:
			return state;
	}
};

const initialState = {
	budget: 2000,
	expenses: [
		{ id: uuidv4(), name: 'Code', cost: 50 },
		{ id: uuidv4(), name: 'Lunch', cost: 300 },
		{ id: uuidv4(), name: 'Roi Acadmemy', cost: 70 },
		{ id: uuidv4(), name: 'UBT parking', cost: 40 },
		{ id: uuidv4(), name: 'idk ', cost: 500 },
	],
};

export const AppContext = createContext();

export const AppProvider = (props) => {

	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				expenses: state.expenses,
				budget: state.budget,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
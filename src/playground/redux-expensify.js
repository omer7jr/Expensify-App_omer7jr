import { legacy_createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';


// AddExpense - action generator

const addExpense = ({
    description = '',
    note = '',
    amount = '',
    createdAt = 0
} = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

// RemoveExpense

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id

});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = "") => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
});

const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    startDate: date
});

const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    endDate: date
});


const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch= typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch= typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch=expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt > b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

//Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense
                }
            });
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id)
        default:
            return state;
    }
}

// Filters Reducer

const expensesFiltersDefaultState = {
    text: '',
    sortBy: '',
    startDate: undefined,
    endDate: undefined
};

const FiltersReducer = (state = expensesFiltersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endtDate: action.endDate
            }
        default:
            return state
    }
}

// Store creation

const store = legacy_createStore(combineReducers({
    expenses: expensesReducer,
    filters: FiltersReducer
})
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 500, createdAt: 2 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 1 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByDate());
store.dispatch(sortByAmount());

// store.dispatch(setStartDate(-1001));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: 'aaa',
        description: 'january rent',
        note: 'this was the final payment',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //amout or date
        startDate: undefined,
        endDate: undefined
    }
};
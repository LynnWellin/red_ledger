import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { getCurrencyFormat } from '../utility/utility';
import Summary from '../components/Summary';

const styles = theme => ({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#00000020',
        overflow: 'hidden',
    },
    expenseList: {
        'overflow-y': 'scroll',
        'overflow-x': 'hidden',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        borderRadius: '5px',
    },
    expenseEntry: {
        padding: '0 1px',
        display: 'flex',
        bottomBorder: '1px solid #00000060',
    },
    expenseItem: {
        padding: '2px 0',
        flex: '1 1 0',
        border: '1px solid #00000020',
        minWidth: '0',
        overflow: 'scroll',
    },
    sort: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sortBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: '#00000060',
    },
    sortContainer: {
        height: '500px',
        width: '700px',
        background: '#ffffff',
        zIndex: 1,
    },
});

class ExpensesAggregates extends Component {
    state = { expenses: [], openSort: false, type: this.props.match.params.type };

    componentDidMount() {
        this.fetchExpenses();
    }

    componentDidUpdate(props) {
        if (props !== this.props) {
            this.setState({ type: this.props.match.params.type }, () => this.fetchExpenses());
        }
    }

    async fetchExpenses() {
        const { type } = this.state;
        const res = await fetch('/api/users/expenses/summary/' + type);
        const data = await res.json();
        console.log(data);
        // data.expenses.forEach(el => console.log(el));
        this.setState({ expenses: data });
    }

    render() {
        const { classes } = this.props;
        const { expenses, openSort, type } = this.state;
        let total = 0;
        return (
            <div className={classes.container}>
                <h2>{`Expenses by ${type === 'cat' ? 'Category' : 'Store'}`}</h2>
                <div className={classes.expenseList}>
                    {expenses.length === 0 ? (
                        <label>{`No expenses for ${
                            type === 'cat' ? 'categories' : 'stores'
                        }`}</label>
                    ) : null}
                    {expenses.map(el => {
                        total += el.amount;
                        return (
                            <div className={classes.expenseEntry}>
                                <label className={classes.expenseItem}>
                                    {type === 'cat' ? el.category_name : el.store_name}
                                </label>
                                <label className={classes.expenseItem}>{`$${getCurrencyFormat(
                                    el.amount
                                )}`}</label>
                            </div>
                        );
                    })}
                </div>
                <Summary total={total} />
            </div>
        );
    }
}

function Sort({ classes, close }) {
    return (
        <div className={classes.sort}>
            <div className={classes.sortContainer}></div>
            <div className={classes.sortBackground} onClick={close}></div>
        </div>
    );
}

export default withStyles(styles)(ExpensesAggregates);
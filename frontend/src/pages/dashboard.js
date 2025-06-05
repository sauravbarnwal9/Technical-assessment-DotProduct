import { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import {
    Box,
    Heading,
    Text,
    VStack,
    Spinner,
    Button,
    Divider,
    Flex,
    useToast,
} from '@chakra-ui/react';
import BudgetForm from '../components/BudgetForm';
import BudgetView from '../components/BudgetView';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import BudgetChart from '../components/BudgetChart';
import TransactionFilter from '../components/TransactionFilter';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { setAuthToken } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}

function DashboardContent() {
    const { logout } = useAuth();
    const toast = useToast();

    const [budget, setBudget] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [loadingBudget, setLoadingBudget] = useState(true);
    const [loadingExpenses, setLoadingExpenses] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);

    const fetchBudget = async () => {
        try {
            setLoadingBudget(true);
            const res = await api.get('/budget');
            console.log("budget", res.data.data.amount)
            setBudget(res.data.data.amount);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load budget');
        } finally {
            setLoadingBudget(false);
        }
    };

    const fetchExpenses = async () => {
        try {
            setLoadingExpenses(true);
            const res = await api.get('/transactions');
            setExpenses(res.data);
            setFilteredExpenses(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load expenses');
        } finally {
            setLoadingExpenses(false);
        }
    };

    useEffect(() => {
        fetchBudget();
        fetchExpenses();
    }, []);

    const handleBudgetSave = async (amount) => {
        try {
            await api.post('/budget', amount);
            toast({ title: 'Budget saved.', status: 'success', duration: 2000 });
            fetchBudget();
        } catch (err) {
            toast({ title: 'Error saving budget.', status: 'error', duration: 2000 });
        }
    };

    const handleAddExpense = async (expense) => {
        try {
            await api.post('/transactions', expense);
            toast({ title: 'Expense added.', status: 'success', duration: 2000 });
            fetchExpenses();
        } catch (err) {
            toast({ title: 'Error adding expense.', status: 'error', duration: 2000 });
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await api.delete(`/transactions/${id}`);
            toast({ title: 'Expense deleted.', status: 'success', duration: 2000 });
            fetchExpenses();
        } catch (err) {
            toast({ title: 'Error deleting expense.', status: 'error', duration: 2000 });
        }
    };

    const handleFilter = (filters) => {
        const { category, startDate, endDate, minAmount, maxAmount } = filters;
        let filtered = [...expenses.data];

        if (category && category !== 'All') {
            filtered = filtered.filter((tx) => tx.category === category);
        }
        if (startDate) {
            filtered = filtered.filter((tx) => new Date(tx.date) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter((tx) => new Date(tx.date) <= new Date(endDate));
        }
        if (minAmount) {
            filtered = filtered.filter((tx) => tx.amount >= parseFloat(minAmount));
        }
        if (maxAmount) {
            filtered = filtered.filter((tx) => tx.amount <= parseFloat(maxAmount));
        }

        setFilteredExpenses({ data: filtered });
    };

    const handleEditExpense = async (id, updatedExpense) => {
        try {
            await api.put(`/transactions/${id}`, updatedExpense);
            toast({ title: 'Expense updated.', status: 'success', duration: 2000 });
            fetchExpenses();
        } catch (err) {
            toast({ title: 'Error updating expense.', status: 'error', duration: 2000 });
        }
    };

    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return (
        <Box maxW="4xl" mx="auto" mt={8} p={6}>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Personal Budget Tracker</Heading>
                <Button onClick={handleLogout} colorScheme="red" size="sm">
                    Logout
                </Button>
            </Flex>

            {error && <Text color="red.500" mb={4}>{error}</Text>}

            <VStack spacing={8} align="stretch">
                <Box>
                    <Heading size="md" mb={1}>
                        This Month’s Budget ({new Date().toLocaleString('default', { month: 'long', year: 'numeric' })})
                    </Heading>

                    <Text fontSize="sm" color="gray.500" mb={4}>
                        Your current budget set for this month
                    </Text>

                    {loadingBudget ? (
                        <Spinner />
                    ) : budget ? (
                        <BudgetView budget={budget} />
                    ) : (
                        <Text>No budget set for this month yet.</Text>
                    )}

                    <BudgetForm onSave={handleBudgetSave} currentBudget={budget} />
                </Box>


                <Divider />

                <Box>
                    <Heading size="md" mb={4}>Transactions</Heading>
                    <TransactionFilter onFilter={handleFilter} />
                </Box>

                <Divider />

                <Box>
                    <Heading size="md" mb={4}>Expenses</Heading>
                    {loadingExpenses ? (
                        <Spinner />
                    ) : (
                        <>
                            <ExpenseList expenses={filteredExpenses.data} onDelete={handleDeleteExpense} onEdit={handleEditExpense} />

                            <ExpenseForm onAdd={handleAddExpense} />
                        </>
                    )}
                </Box>

                <Divider />

                {budget && (
                    <Box>
                        <Heading size="sm" mb={2}>Budget vs Expenses</Heading>

                        <Text fontSize="sm" color="gray.600" mb={2}>
                            You set a budget of ₹{budget} for this month. You've spent ₹
                            {expenses.data?.reduce((acc, tx) => acc + tx.amount, 0) || 0} so far.
                        </Text>

                        <BudgetChart
                            budget={budget || 0}
                            expenses={expenses.data?.reduce((acc, tx) => acc + tx.amount, 0) || 0}
                        />
                    </Box>
                )}

            </VStack>
        </Box>
    );
}

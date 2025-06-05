import { useState } from 'react';
import {
    Box,
    Text,
    Button,
    VStack,
    HStack,
    Input,
    Stack,
} from '@chakra-ui/react';

export default function ExpenseList({ expenses, onDelete, onEdit }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ description: '', amount: '' });

    const itemsPerPage = 5;

    if (!expenses?.length) {
        return <Text>No expenses added yet.</Text>;
    }

    const totalPages = Math.ceil(expenses.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentExpenses = expenses.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const handleEditClick = (expense) => {
        setEditId(expense._id);
        setEditData({
            description: expense.description,
            amount: expense.amount,
        });
    };

    const handleSave = () => {
        onEdit(editId, {
            ...editData,
            amount: parseFloat(editData.amount),
        });
        setEditId(null);
    };

    const handleCancel = () => {
        setEditId(null);
        setEditData({ description: '', amount: '' });
    };

    return (
        <VStack spacing={3} align="stretch" mb={4}>
            {currentExpenses.map(({ _id, description, amount, date }) => (
                <Box
                    key={_id}
                    p={3}
                    borderWidth={1}
                    borderRadius="md"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {editId === _id ? (
                        <Box w="100%">
                            <Stack spacing={2}>
                                <Input
                                    value={editData.description}
                                    onChange={(e) =>
                                        setEditData((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                />
                                <Input
                                    type="number"
                                    value={editData.amount}
                                    onChange={(e) =>
                                        setEditData((prev) => ({
                                            ...prev,
                                            amount: e.target.value,
                                        }))
                                    }
                                />
                                <HStack spacing={2}>
                                    <Button colorScheme="green" size="sm" onClick={handleSave}>
                                        Save
                                    </Button>
                                    <Button size="sm" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </HStack>
                            </Stack>
                        </Box>
                    ) : (
                        <>
                            <Box>
                                <Text fontWeight="bold">{description}</Text>
                                <Text color="gray.600">₹{amount.toFixed(2)}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    {new Date(date).toLocaleDateString()}
                                </Text>
                            </Box>
                            <HStack spacing={2}>
                                <Button size="sm" onClick={() => handleEditClick({ _id, description, amount })}>
                                    Edit
                                </Button>
                                <Button colorScheme="red" size="sm" onClick={() => onDelete(_id)}>
                                    Delete
                                </Button>
                            </HStack>
                        </>
                    )}
                </Box>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <HStack justify="center" pt={4}>
                    <Button size="sm" onClick={handlePrev} isDisabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Text fontSize="sm">
                        Page {currentPage} of {totalPages}
                    </Text>
                    <Button size="sm" onClick={handleNext} isDisabled={currentPage === totalPages}>
                        Next
                    </Button>
                </HStack>
            )}
        </VStack>
    );
}

import { useState } from 'react';
import {
  Button,
  Input,
  HStack,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Select,
} from '@chakra-ui/react';

export default function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // Optional: Predefined categories
  const categories = ['Groceries', 'Rent', 'Utilities', 'Transport', 'Entertainment', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await onAdd({
      type: 'expense', // explicitly setting type
      description,
      amount: parseFloat(amount),
      date,
      category,
    });

    // Reset fields
    // setDescription('');
    // setAmount('');
    // setDate('');
    // setCategory('');
    setLoading(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={3} align="stretch">
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Expense description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              placeholder="Amount"
              min={0}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="blue" isLoading={loading}>
            Add Expense
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    HStack,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

const categories = ['All', 'Groceries', 'Rent', 'Utilities', 'Transport', 'Entertainment', 'Other'];

export default function TransactionFilter({ onFilter }) {
    const [filters, setFilters] = useState({
        category: 'All',
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: '',
    });

    const handleChange = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleApply = () => {
        onFilter(filters);
    };

    const handleClear = () => {
        const cleared = {
            category: 'All',
            startDate: '',
            endDate: '',
            minAmount: '',
            maxAmount: '',
        };
        setFilters(cleared);
        onFilter(cleared);
    };

    return (
        <Box p={4} border="1px solid #ddd" rounded="md" bg="gray.50">
            <VStack spacing={4} align="stretch">
                <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select name="category" value={filters.category} onChange={handleChange}>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <HStack spacing={4}>
                    <FormControl>
                        <FormLabel>From</FormLabel>
                        <Input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>To</FormLabel>
                        <Input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
                    </FormControl>
                </HStack>

                <HStack spacing={4}>
                    <FormControl>
                        <FormLabel>Min Amount</FormLabel>
                        <Input type="number" name="minAmount" value={filters.minAmount} onChange={handleChange} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Max Amount</FormLabel>
                        <Input type="number" name="maxAmount" value={filters.maxAmount} onChange={handleChange} />
                    </FormControl>
                </HStack>

                <HStack justify="flex-end">
                    <Button onClick={handleClear} variant="outline" colorScheme="gray">
                        Clear
                    </Button>
                    <Button onClick={handleApply} colorScheme="blue">
                        Apply Filters
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}

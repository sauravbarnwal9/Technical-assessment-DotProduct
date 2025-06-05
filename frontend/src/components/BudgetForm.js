import { useState } from 'react';
import { Button, Input, HStack, FormControl, FormLabel, VStack } from '@chakra-ui/react';

export default function BudgetForm({ onSave, currentBudget }) {
    const [amount, setAmount] = useState(currentBudget || '');
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // "YYYY-MM"
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSave({ amount: parseFloat(amount), month });
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack align="start" spacing={4}>
                <FormControl>
                    <FormLabel>Budget Month</FormLabel>
                    <Input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        isRequired
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Set Budget Amount</FormLabel>
                    <HStack>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter budget amount"
                            min={0}
                            step="0.01"
                            isRequired
                        />
                        <Button type="submit" colorScheme="blue" isLoading={loading}>
                            Save
                        </Button>
                    </HStack>
                </FormControl>
            </VStack>
        </form>
    );
}

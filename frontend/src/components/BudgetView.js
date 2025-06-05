import { Box, Text } from '@chakra-ui/react';

export default function BudgetView({ budget }) {
    if (!budget) {
        return <Text>No budget set yet.</Text>;
    }
    console.log(budget)

    return (
        <Box p={4} borderWidth={1} borderRadius="md" mb={4}>
            <Text fontSize="xl" fontWeight="bold">
                ${budget.toFixed(2)}
            </Text>
            <Text color="gray.600">Budget Amount</Text>
        </Box>
    );
}

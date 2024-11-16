import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Users: React.FC = () => {
	return (
		<Box p={4}>
			<Text fontSize="xl" fontWeight="bold">
				Users
			</Text>
			{/* Add your Wallets content here */}
			<Text mt={2}>This is the Users section. You can manage your users here.</Text>
		</Box>
	);
};

export default Users;

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Chat: React.FC = () => {
	return (
		<Box p={4}>
			<Text fontSize="xl" fontWeight="bold">
				Chat
			</Text>
			{/* Add your Wallets content here */}
			<Text mt={2}>This is the Chat section. You can manage your chat here.</Text>
		</Box>
	);
};

export default Chat;

import { Box, Button, Text } from '@chakra-ui/react';
import { usePrivy } from '@privy-io/react-auth';
import React from 'react';
const Profile: React.FC = () => {
	const { user, authenticated, login, logout, connectWallet, createWallet } = usePrivy();
	console.log(user);
	return (
		<Box p={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center" minH="100vh">
			{!authenticated && (
				<>
					<Text fontSize="2xl" mb={4}>
						Login with socials or connect your wallet
					</Text>
					<Box display="flex" flexDirection="row" gap={4}>
						<Button onClick={() => (authenticated ? logout() : login())}>{authenticated ? 'Logout' : 'Login'}</Button>
					</Box>
				</>
			)}
			{authenticated && (
				<>
					<Text fontSize="2xl" mb={4}>
						Welcome {user?.email?.address}
					</Text>
					<Box display="flex" flexDirection="row" gap={4}>
						<Button onClick={logout}>Logout</Button>
						<Button onClick={connectWallet}>Connect Wallet</Button>
					</Box>
				</>
			)}
		</Box>
	);
};

export default Profile;

// omitted for brevity

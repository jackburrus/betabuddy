import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import AddWalletCard from './AddWalletCard';
import { useWallets } from '@/contexts/WalletsContext';
import WalletCard from './WalletCard';

const Wallets: React.FC = () => {
	const { wallets } = useWallets();
	console.log('wallets', wallets);
	return (
		<Box p={4} display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
			<AddWalletCard />
			{wallets.map((wallet) => (
				<WalletCard key={wallet.address} wallet={wallet} />
			))}
		</Box>
	);
};

export default Wallets;

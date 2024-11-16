import React from 'react';
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import AddWalletCard from './AddWalletCard';
import { useWallets } from '@/contexts/WalletsContext';
import WalletCard from './WalletCard';
import BulkUpload from './BulkUpload';
import LoadFromConfig from './LoadFromConfig';

const Wallets: React.FC = () => {
	const { wallets } = useWallets();

	return (
		<div>
			<BulkUpload />
			<LoadFromConfig />
			<Box p={4} display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
				<AddWalletCard />
				{wallets.map((wallet) => (
					<WalletCard key={wallet.address} wallet={wallet} />
				))}
			</Box>
		</div>
	);
};

export default Wallets;

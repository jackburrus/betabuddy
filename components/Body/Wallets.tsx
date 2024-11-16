import React from 'react';
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import AddWalletCard from './AddWalletCard';
import { useWallets } from '@/contexts/WalletsContext';
import WalletCard from './WalletCard';
import BulkUpload from './BulkUpload';

const Wallets: React.FC = () => {
	const { wallets } = useWallets();

	return (
		<div>
			<BulkUpload />
			<Box
				p={4}
				borderRadius="md"
				textAlign="center"
				cursor="pointer"
				onClick={() => navigator.clipboard.writeText('0x4bEf0221d6F7Dd0C969fe46a4e9b339a84F52FDF')}
			>
				<Text>0x4bEf0221d6F7Dd0C969fe46a4e9b339a84F52FDF</Text>
			</Box>
			<Box
				p={4}
				borderRadius="md"
				textAlign="center"
				cursor="pointer"
				onClick={() => navigator.clipboard.writeText('0x4bEf0221d6F7Dd0C969fe46a4e9b339a84F52FDF')}
			>
				<Text>0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9</Text>
			</Box>
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

import { Wallet } from '@/contexts/WalletsContext';
import { Box, Text } from '@chakra-ui/react';
import { Address } from 'viem';

export default function WalletCard({ wallet }: { wallet: Wallet }) {
	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
			<Text fontSize="xl" fontWeight="bold">
				{wallet.address}
			</Text>
		</Box>
	);
}

import { Wallet } from '@/contexts/WalletsContext';
import { Box, Button, Divider, Text } from '@chakra-ui/react';
import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';

<Identity
	address="0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9"
	schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
>
	<Avatar />
	<Name>
		<Badge />
	</Name>
	<Address />
</Identity>;
export default function WalletCard({ wallet }: { wallet: Wallet }) {
	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
			<Identity address={wallet.address} schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9">
				<Avatar />
				<Name>
					<Badge />
				</Name>
				<Address />
			</Identity>
			<Box mt={4}>
				<Text fontSize="lg" fontWeight="bold" mb={2}>
					POV Mode
				</Text>
				<Divider />
				<Box display="grid" gridTemplateColumns="repeat(5, 1fr)" marginTop={4} gap={4}>
					{Array.from({ length: 10 }).map((_, index) => (
						<Button key={index} width="50px" height="50px" />
					))}
				</Box>
			</Box>
		</Box>
	);
}

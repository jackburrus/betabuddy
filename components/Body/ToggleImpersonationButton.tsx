import { Wallet } from '@/contexts/WalletsContext';
import { Button, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useSafeInject } from '../../contexts/SafeInjectContext';
import { useEffect } from 'react';

export default function ToggleImpersonationButton({ wallet }: { wallet: Wallet }) {
	const toast = useToast();
	const { setAddress: setIFrameAddress, setRpcUrl, address } = useSafeInject();

	const enableImpersonation = async () => {
		try {
			// Initialize a JSON-RPC provider with a local fork or desired RPC
			const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

			// Example impersonated address
			const impersonatedAddress = wallet.address;

			// Set the provider in your context or state
			setRpcUrl(process.env.NEXT_PUBLIC_RPC_URL);
			setIFrameAddress(impersonatedAddress);

			toast({
				title: 'Impersonation Enabled',
				description: `Wallet impersonating ${impersonatedAddress}`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});

			console.log(`Impersonation enabled for address: ${impersonatedAddress}`);
		} catch (error) {
			console.error('Failed to enable impersonation:', error);
			toast({
				title: 'Error',
				description: 'Failed to enable impersonation.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Button colorScheme="cyan" size="lg" width="100%" onClick={enableImpersonation}>
			Connect
		</Button>
	);
}

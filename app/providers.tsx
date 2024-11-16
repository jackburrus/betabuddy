'use client';

import '@/style/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import {
	ConnectWallet,
	Wallet,
	WalletDropdown,
	WalletDropdownBasename,
	WalletDropdownFundLink,
	WalletDropdownLink,
	WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import { Address, Avatar, Name, Identity, EthBalance } from '@coinbase/onchainkit/identity';
import { getConfig } from '@/app/wagmi'; // your import path may vary
import { WalletsProvider } from '@/contexts/WalletsContext';
import { useState } from 'react';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [config] = useState(() => getConfig());
	const [queryClient] = useState(() => new QueryClient());
	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<WagmiProvider config={config}>
					<OnchainKitProvider
						apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
						chain={base} // add baseSepolia for testing
					>
						<WalletsProvider>{children}</WalletsProvider>
					</OnchainKitProvider>
				</WagmiProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
};

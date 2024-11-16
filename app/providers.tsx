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
import { PrivyProvider } from '@privy-io/react-auth';

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
						<PrivyProvider
							config={{
								// Customize Privy's appearance in your app
								appearance: {
									theme: 'light',
									accentColor: '#676FFF',
									logo: 'https://your-logo-url',
								},
								// Create embedded wallets for users who don't have a wallet
								embeddedWallets: {
									createOnLogin: 'users-without-wallets',
								},
							}}
							appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
						>
							<WalletsProvider>{children}</WalletsProvider>
						</PrivyProvider>
					</OnchainKitProvider>
				</WagmiProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
};

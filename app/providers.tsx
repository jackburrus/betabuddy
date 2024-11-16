'use client';

import '@/style/globals.css';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';

import theme from '@/style/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

import { getConfig } from '@/app/wagmi'; // your import path may vary
import { WalletsProvider } from '@/contexts/WalletsContext';
import { useState } from 'react';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [config] = useState(() => getConfig());
	const [queryClient] = useState(() => new QueryClient());
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<WagmiProvider config={config}>
					<OnchainKitProvider
						apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
						chain={baseSepolia} // add baseSepolia for testing
					>
						<WalletsProvider>{children}</WalletsProvider>
					</OnchainKitProvider>
				</WagmiProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
};

'use client';

import '@/style/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { connectorsForWallets, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, base, mainnet, optimism } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import theme from '@/style/theme';

import { SafeInjectProvider } from '@/contexts/SafeInjectContext';
import { WalletsProvider } from '@/contexts/WalletsContext';

const { chains, publicClient } = configureChains(
	// the first chain is used by rainbowWallet to determine which chain to use
	[mainnet, optimism, base, arbitrum],
	[publicProvider()],
);

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;
const connectors = connectorsForWallets([
	{
		groupName: 'Recommended',
		wallets: [
			metaMaskWallet({ projectId, chains }),
			walletConnectWallet({ projectId, chains }),
			rainbowWallet({ projectId, chains }),
		],
	},
]);

export const wagmiConfig = createConfig({
	autoConnect: false,
	connectors,
	publicClient,
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ChakraProvider theme={theme}>
			<WagmiConfig config={wagmiConfig}>
				<RainbowKitProvider chains={chains} theme={darkTheme()} modalSize={'compact'}>
					<WalletsProvider>{children}</WalletsProvider>
				</RainbowKitProvider>
			</WagmiConfig>
		</ChakraProvider>
	);
};

import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base } from 'wagmi/chains'; // add baseSepolia for testing
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors';
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;
export function getConfig() {
	return createConfig({
		chains: [base], // add baseSepolia for testing
		connectors: [
			coinbaseWallet({
				appName: 'BetaBuddy',
				preference: 'smartWalletOnly',
				version: '4',
			}),
			metaMask(),
			walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! }),
		],
		storage: createStorage({
			storage: cookieStorage,
		}),
		ssr: true,
		transports: {
			[base.id]: http(), // add baseSepolia for testing
		},
	});
}

declare module 'wagmi' {
	interface Register {
		config: ReturnType<typeof getConfig>;
	}
}

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Wallet {
	address: string;
	walletConnectUrl?: string;
}

interface WalletsContextProps {
	wallets: Wallet[];
	addWallet: (wallet: Wallet) => void;
	removeWallet: (address: string) => void;
}

const WalletsContext = createContext<WalletsContextProps | undefined>(undefined);

export const WalletsProvider = ({ children }: { children: ReactNode }) => {
	const [wallets, setWallets] = useState<Wallet[]>([]);

	const logWallets = (action: string) => {
		console.log(`${action} wallet. Current wallets:`, wallets);
	};

	const addWallet = (wallet: Wallet) => {
		setWallets((prevWallets) => {
			const newWallets = [...prevWallets, wallet];
			logWallets('Added');
			return newWallets;
		});
	};

	const removeWallet = (address: string) => {
		setWallets((prevWallets) => {
			const newWallets = prevWallets.filter((wallet) => wallet.address !== address);
			logWallets('Removed');
			return newWallets;
		});
	};

	return <WalletsContext.Provider value={{ wallets, addWallet, removeWallet }}>{children}</WalletsContext.Provider>;
};

export const useWallets = (): WalletsContextProps => {
	const context = useContext(WalletsContext);
	if (!context) {
		throw new Error('useWallets must be used within a WalletsProvider');
	}
	return context;
};

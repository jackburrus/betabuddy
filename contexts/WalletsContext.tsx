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

	const addWallet = (wallet: Wallet) => {
		console.log('adding wallet', wallet);
		setWallets((prevWallets) => [...prevWallets, wallet]);
	};

	const removeWallet = (address: string) => {
		console.log('removing wallet', address);
		setWallets((prevWallets) => prevWallets.filter((wallet) => wallet.address !== address));
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

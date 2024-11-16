import React from 'react';
import { Box, Text } from '@chakra-ui/react';
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
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Profile: React.FC = () => {
	const account = useAccount();
	return (
		<Box p={4}>
			<Text fontSize="xl" fontWeight="bold">
				Profile
			</Text>
			{/* <Wallet>
				<ConnectWallet>
					<Avatar className="h-6 w-6" />
					<Name />
				</ConnectWallet>
				<WalletDropdown>
					<Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
						<Avatar />
						<Name />
						<Address />
						<EthBalance />
					</Identity>
					<WalletDropdownBasename />
					<WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
						Wallet
					</WalletDropdownLink>
					<WalletDropdownFundLink />
					<WalletDropdownDisconnect />
				</WalletDropdown>
			</Wallet> */}
		</Box>
	);
};

export default Profile;

// omitted for brevity

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	Icon,
	useColorModeValue,
	Text,
	Drawer,
	DrawerContent,
	useDisclosure,
	BoxProps,
	FlexProps,
	useToast,
	Image,
} from '@chakra-ui/react';
import networksList from 'evm-rpcs-list';
import { FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu, FiUsers, FiMessageCircle, FiUser } from 'react-icons/fi';
import { IoWallet } from 'react-icons/io5';
import { Core } from '@walletconnect/core';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Wallets from './Wallets';
import { WalletKit, IWalletKit } from '@reown/walletkit';
import Users from './Users';
import Chat from './Chat';
import Profile from './Users';
import { TxnDataType } from '@/types';
import { useSafeInject } from '@/contexts/SafeInjectContext';
import { SingleValue } from 'chakra-react-select';
import { SelectedNetworkOption } from '@/types';
import { ethers } from 'ethers';
import { ProposalTypes, SessionTypes } from '@walletconnect/types';
import axios from 'axios';
import { parseUri } from '@walletconnect/utils';
interface LinkItemProps {
	name: string;
	icon: IconType;
}
const WCMetadata = {
	name: 'Impersonator',
	description: 'Login to dapps as any address',
	url: 'www.impersonator.xyz',
	icons: ['https://www.impersonator.xyz/favicon.ico'],
};

const core = new Core({
	projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
});
const LinkItems: Array<LinkItemProps> = [
	{ name: 'Profile', icon: FiUser },
	{ name: 'Wallets', icon: IoWallet },
	// { name: 'Chat', icon: FiMessageCircle },
	{ name: 'Settings', icon: FiSettings },
];

const primaryNetworkIds = [
	1, // ETH Mainnet
	42161, // Arbitrum One
	43114, // Avalanche
	56, // BSC
	250, // Fantom Opera
	5, // Goerli Testnet
	100, // Gnosis
	10, // Optimism
	137, // Polygon
	8453, // Base
];

const primaryNetworkOptions = primaryNetworkIds.map((id) => {
	return { chainId: id };
});
const allNetworksOptions = [...primaryNetworkOptions];

interface SimpleSidebarProps {
	onTabSelect: (tab: string) => void;
	selectedTab: string;
}

export default function Body() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedTab, setSelectedTab] = React.useState<string>('Wallets');

	const renderContent = () => {
		switch (selectedTab) {
			case 'Profile':
				return <Profile />;
			case 'Wallets':
				return <Wallets />;
			// case 'Chat':
			// 	return <Chat />;
			default:
				return <Wallets />;
		}
	};

	const handleTabSelect = (tab: string) => {
		setSelectedTab(tab);
		if (isOpen) {
			onClose();
		}
	};

	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent
				onClose={onClose}
				display={{ base: 'none', md: 'block' }}
				onTabSelect={handleTabSelect}
				selectedTab={selectedTab}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} onTabSelect={handleTabSelect} selectedTab={selectedTab} />
				</DrawerContent>
			</Drawer>
			<IconButton
				display={{ base: 'block', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
				m="4"
			/>
			<Box ml={{ base: 0, md: 60 }} p="4">
				{renderContent()}
			</Box>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
	onTabSelect: (tab: string) => void;
	selectedTab: string;
}

const SidebarContent = ({ onClose, onTabSelect, selectedTab, ...rest }: SidebarProps) => {
	return (
		<Box
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Image mt="2" height={'14'} src="/logo.png" />
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem
					key={link.name}
					icon={link.icon}
					isActive={selectedTab === link.name}
					onClick={() => onTabSelect(link.name)}
				>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactText;
	isActive: boolean;
	onClick: () => void;
}

const NavItem = ({ icon, children, isActive, onClick, ...rest }: NavItemProps) => {
	return (
		<Box
			as="button"
			onClick={onClick}
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}
			width="100%"
			mb={4}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				bg={isActive ? 'cyan.400' : 'transparent'}
				color={isActive ? 'white' : 'inherit'}
				_hover={{
					bg: 'cyan.50',
					color: 'inherit',
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: 'black',
						}}
						as={icon}
					/>
				)}
				<Text
					_groupHover={{
						color: 'black',
					}}
				>
					{children}
				</Text>
			</Flex>
		</Box>
	);
};

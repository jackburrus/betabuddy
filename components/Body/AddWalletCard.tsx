'use client';

import { CheckCircleIcon, AddIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, StackDivider } from '@chakra-ui/react';

import { FormEvent, ChangeEvent, useState } from 'react';
import {
	Stack,
	FormControl,
	Input,
	Button,
	useColorModeValue,
	Heading,
	Text,
	Container,
	Flex,
	Select,
} from '@chakra-ui/react';
import { useWallets } from '@/contexts/WalletsContext';
import { isAddress } from 'ethers/lib/utils'; // Import ethers.js utility for address validation

export default function AddWalletCard() {
	const { addWallet } = useWallets();
	const [walletAddress, setWalletAddress] = useState('');
	const [walletConnectUrl, setWalletConnectUrl] = useState('');
	const [state, setState] = useState<'initial' | 'submitting' | 'success'>('initial');
	const [error, setError] = useState(false);
	const [showWalletConnectUrl, setShowWalletConnectUrl] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setError(false);
		setState('submitting');

		if (isAddress(walletAddress)) {
			console.log('adding wallet', walletAddress, walletConnectUrl);
			addWallet({ address: walletAddress, walletConnectUrl: showWalletConnectUrl ? walletConnectUrl : undefined });
			setState('success');
		} else {
			console.log('invalid wallet address', walletAddress);
			setError(true);
			setState('initial');
		}
	};

	return (
		<Flex bg={useColorModeValue('gray.50', 'gray.800')} minH="300px" position="relative">
			<Container maxW={'lg'} bg={useColorModeValue('white', 'whiteAlpha.100')} boxShadow={'xl'} rounded={'lg'} p={6}>
				<Heading as={'h2'} fontSize={{ base: 'xl', sm: '2xl' }} textAlign={'center'} mb={5}>
					Add Wallet
				</Heading>
				<Stack as={'form'} spacing={'12px'} onSubmit={handleSubmit}>
					<FormControl>
						<Input
							variant={'solid'}
							borderWidth={1}
							color={'gray.50'}
							_placeholder={{
								color: 'gray.400',
							}}
							borderColor={useColorModeValue('gray.300', 'gray.700')}
							id={'walletAddress'}
							type={'text'}
							required
							placeholder={'Wallet Address'}
							aria-label={'Wallet Address'}
							value={walletAddress}
							disabled={state !== 'initial'}
							onChange={(e: ChangeEvent<HTMLInputElement>) => setWalletAddress(e.target.value)}
						/>
					</FormControl>
					<Stack direction={'column'} spacing={'12px'}>
						<FormControl>
							<Select
								placeholder="Options"
								onChange={(e) => setShowWalletConnectUrl(e.target.value === 'walletConnect')}
							>
								<option value="walletConnect">Wallet Connect</option>
							</Select>
						</FormControl>
						{showWalletConnectUrl && (
							<FormControl>
								<Input
									variant={'solid'}
									borderWidth={1}
									color={'gray.50'}
									_placeholder={{
										color: 'gray.400',
									}}
									borderColor={useColorModeValue('gray.300', 'gray.700')}
									id={'walletConnectUrl'}
									type={'url'}
									placeholder={'Wallet Connect URL: wc://...'}
									aria-label={'Wallet Connect URL'}
									value={walletConnectUrl}
									onChange={(e: ChangeEvent<HTMLInputElement>) => setWalletConnectUrl(e.target.value)}
								/>
							</FormControl>
						)}
					</Stack>
					<Button
						colorScheme={state === 'success' ? 'green' : 'blue'}
						isLoading={state === 'submitting'}
						position="absolute"
						bottom="4"
						right="4"
						type="submit"
					>
						{state === 'success' ? <CheckCircleIcon /> : <AddIcon />}
					</Button>
				</Stack>
			</Container>
		</Flex>
	);
}

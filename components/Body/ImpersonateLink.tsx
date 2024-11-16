import { Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { useSafeInject } from '@/contexts/SafeInjectContext';
import { SelectedNetworkOption, TxnDataType } from '@/types';
import { useToast } from '@chakra-ui/react';
import { IWalletKit, WalletKit } from '@reown/walletkit';
import { Core } from '@walletconnect/core';
import { ProposalTypes, SessionTypes } from '@walletconnect/types';
import { getSdkError, parseUri } from '@walletconnect/utils';
import axios from 'axios';
import { SingleValue } from 'chakra-react-select';
import { ethers } from 'ethers';
import networksList from 'evm-rpcs-list';
import { useCallback, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FiSettings, FiUser } from 'react-icons/fi';
import { IoWallet } from 'react-icons/io5';
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

export default function ImpersonateLink({
	address: addressFromProps,
	index,
	dapp,
}: {
	address: `0x${string}`;
	index: number;
	dapp: { name: string; url: string; icon: string };
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	let addressFromURL: string | null = null;
	let showAddressCache: string | null = null;
	let urlFromURL: string | null = null;
	let urlFromCache: string | null = null;
	let chainFromURL: string | null = null;
	let tenderlyForkIdCache: string | null = null;

	if (typeof window !== 'undefined') {
		const urlParams = new URLSearchParams(window.location.search);
		addressFromURL = urlParams.get('address');
		urlFromURL = urlParams.get('url');
		chainFromURL = urlParams.get('chain');
	}
	if (typeof localStorage !== 'undefined') {
		showAddressCache = localStorage.getItem('showAddress');
		urlFromCache = localStorage.getItem('appUrl');
		tenderlyForkIdCache = localStorage.getItem('tenderlyForkId');
	}
	let networkIdViaURL = 1;
	if (chainFromURL) {
		for (let i = 0; i < allNetworksOptions.length; i++) {
			if (allNetworksOptions[i].name.toLowerCase().includes(chainFromURL.toLowerCase())) {
				networkIdViaURL = allNetworksOptions[i].chainId;
				break;
			}
		}
	}
	const toast = useToast();

	const { setAddress: setIFrameAddress, appUrl, setAppUrl, setRpcUrl, iframeRef, latestTransaction } = useSafeInject();

	const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>();
	const [showAddress, setShowAddress] = useState(addressFromURL ?? showAddressCache ?? ''); // gets displayed in input. ENS name remains as it is
	const [address, setAddress] = useState(addressFromProps); // internal resolved address
	const [isAddressValid, setIsAddressValid] = useState(true);
	const [uri, setUri] = useState('');
	const [networkId, setNetworkId] = useState(networkIdViaURL);
	const [selectedNetworkOption, setSelectedNetworkOption] = useState<SingleValue<SelectedNetworkOption>>({
		label: networksList[networkIdViaURL].name,
		value: networkIdViaURL,
	});
	// WC v2
	const [web3wallet, setWeb3Wallet] = useState<IWalletKit>();
	const [web3WalletSession, setWeb3WalletSession] = useState<SessionTypes.Struct>();
	const [isConnected, setIsConnected] = useState(false);
	const [loading, setLoading] = useState(false);

	const [selectedTabIndex, setSelectedTabIndex] = useState(urlFromURL ? 1 : 0);
	const [isIFrameLoading, setIsIFrameLoading] = useState(false);

	const [inputAppUrl, setInputAppUrl] = useState<string | undefined>(urlFromURL ?? urlFromCache ?? undefined);
	const [iframeKey, setIframeKey] = useState(0); // hacky way to reload iframe when key changes

	const [tenderlyForkId, setTenderlyForkId] = useState(tenderlyForkIdCache ?? '');
	const [sendTxnData, setSendTxnData] = useState<TxnDataType[]>([]);
	useEffect(() => {
		// only use cached address if no address from url provided
		if (!addressFromURL) {
			// getCachedSession
			const _showAddress = localStorage.getItem('showAddress') ?? undefined;
			// WC V2
			initWeb3Wallet(true, _showAddress);
		}

		setProvider(
			new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
		);
	}, []);

	useEffect(() => {
		updateNetwork((selectedNetworkOption as SelectedNetworkOption).value);
		// eslint-disable-next-line
	}, [selectedNetworkOption]);

	useEffect(() => {
		if (provider && addressFromURL && urlFromURL) {
			initIFrame();
		}
		// eslint-disable-next-line
	}, [provider]);

	useEffect(() => {
		localStorage.setItem('tenderlyForkId', tenderlyForkId);
	}, [tenderlyForkId]);

	useEffect(() => {
		localStorage.setItem('showAddress', showAddress);
	}, [showAddress]);

	useEffect(() => {
		if (inputAppUrl) {
			localStorage.setItem('appUrl', inputAppUrl);
		}
	}, [inputAppUrl]);

	useEffect(() => {
		setIFrameAddress(address);
		// eslint-disable-next-line
	}, [address]);

	useEffect(() => {
		// TODO: use random rpc if this one is slow/down?
		setRpcUrl(networksList[networkId].rpcs[0]);
		// eslint-disable-next-line
	}, [networkId]);

	useEffect(() => {
		if (latestTransaction) {
			const newTxn = {
				from: address,
				...latestTransaction,
			};

			setSendTxnData((data) => {
				if (data.some((d) => d.id === newTxn.id)) {
					return data;
				} else {
					return [{ ...newTxn, value: parseInt(newTxn.value, 16).toString() }, ...data];
				}
			});

			if (tenderlyForkId.length > 0) {
				axios
					.post('https://rpc.tenderly.co/fork/' + tenderlyForkId, {
						jsonrpc: '2.0',
						id: newTxn.id,
						method: 'eth_sendTransaction',
						params: [
							{
								from: newTxn.from,
								to: newTxn.to,
								value: newTxn.value,
								data: newTxn.data,
							},
						],
					})
					.then((res) => {
						console.log(res.data);
						toast({
							title: 'Txn Simulated on Tenderly',
							description: `Hash: ${res.data.result}`,
							status: 'success',
							position: 'bottom-right',
							duration: null,
							isClosable: true,
						});
					});
			}
		}
		// eslint-disable-next-line
	}, [latestTransaction, tenderlyForkId]);

	const initWeb3Wallet = async (onlyIfActiveSessions?: boolean, _showAddress?: string) => {
		const _web3wallet = await WalletKit.init({
			core,
			metadata: WCMetadata,
		});

		if (onlyIfActiveSessions) {
			const sessions = _web3wallet.getActiveSessions();
			const sessionsArray = Object.values(sessions);
			console.log({ sessions });
			if (sessionsArray.length > 0) {
				const _address = sessionsArray[0].namespaces['eip155'].accounts[0].split(':')[2];
				console.log({ _showAddress, _address });
				setWeb3WalletSession(sessionsArray[0]);
				setShowAddress(_showAddress && _showAddress.length > 0 ? _showAddress : _address);
				if (!(_showAddress && _showAddress.length > 0)) {
					localStorage.setItem('showAddress', _address);
				}
				setAddress(_address);
				setUri(`wc:${sessionsArray[0].pairingTopic}@2?relay-protocol=irn&symKey=xxxxxx`);
				setWeb3Wallet(_web3wallet);
				setIsConnected(true);
			}
		} else {
			setWeb3Wallet(_web3wallet);
			if (_showAddress) {
				setShowAddress(_showAddress);
				setAddress(_showAddress);
			}
		}

		// for debugging
		(window as any).w3 = _web3wallet;
	};

	const resolveAndValidateAddress = async () => {
		let isValid;
		let _address = address;
		if (!address) {
			isValid = false;
		} else {
			// Resolve ENS
			const resolvedAddress = await provider!.resolveName(address);
			if (resolvedAddress) {
				setAddress(resolvedAddress);
				_address = resolvedAddress;
				isValid = true;
			} else if (ethers.utils.isAddress(address)) {
				isValid = true;
			} else {
				isValid = false;
			}
		}

		setIsAddressValid(isValid);
		if (!isValid) {
			toast({
				title: 'Invalid Address',
				description: 'Address is not an ENS or Ethereum address',
				status: 'error',
				isClosable: true,
				duration: 4000,
			});
		}

		return { isValid, _address: _address };
	};

	const initWalletConnect = async () => {
		setLoading(true);
		const { isValid } = await resolveAndValidateAddress();

		if (isValid) {
			const { version } = parseUri(uri);

			try {
				if (version === 1) {
					toast({
						title: "Couldn't Connect",
						description: 'The dapp is still using the deprecated WalletConnect V1',
						status: 'error',
						isClosable: true,
						duration: 8000,
					});
					setLoading(false);

					// let _legacySignClient = new LegacySignClient({ uri });

					// if (!_legacySignClient.connected) {
					//   await _legacySignClient.createSession();
					// }

					// setLegacySignClient(_legacySignClient);
					// setUri(_legacySignClient.uri);
				} else {
					await initWeb3Wallet();
				}
			} catch (err) {
				console.error(err);
				toast({
					title: "Couldn't Connect",
					description: 'Refresh dApp and Connect again',
					status: 'error',
					isClosable: true,
					duration: 2000,
				});
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	};

	const initIFrame = async (_inputAppUrl = inputAppUrl) => {
		setIsIFrameLoading(true);
		if (_inputAppUrl === appUrl) {
			setIsIFrameLoading(false);
			return;
		}

		const { isValid } = await resolveAndValidateAddress();
		if (!isValid) {
			setIsIFrameLoading(false);
			return;
		}

		setAppUrl(_inputAppUrl);
	};

	const onSessionProposal = useCallback(
		async (proposal) => {
			if (loading) {
				setLoading(false);
			}
			console.log('EVENT', 'session_proposal', proposal);

			const { requiredNamespaces, optionalNamespaces } = proposal.params;
			const namespaceKey = 'eip155';
			const requiredNamespace = requiredNamespaces[namespaceKey] as ProposalTypes.BaseRequiredNamespace | undefined;
			const optionalNamespace = optionalNamespaces ? optionalNamespaces[namespaceKey] : undefined;

			let chains: string[] | undefined = requiredNamespace === undefined ? undefined : requiredNamespace.chains;
			if (optionalNamespace && optionalNamespace.chains) {
				if (chains) {
					// merge chains from requiredNamespace & optionalNamespace, while avoiding duplicates
					chains = Array.from(new Set(chains.concat(optionalNamespace.chains)));
				} else {
					chains = optionalNamespace.chains;
				}
			}

			const accounts: string[] = [];
			chains?.map((chain) => {
				accounts.push(`${chain}:${address}`);
				return null;
			});
			const namespace: SessionTypes.Namespace = {
				accounts,
				chains: chains,
				methods: requiredNamespace === undefined ? [] : requiredNamespace.methods,
				events: requiredNamespace === undefined ? [] : requiredNamespace.events,
			};

			if (requiredNamespace && requiredNamespace.chains) {
				const _chainId = parseInt(requiredNamespace.chains[0].split(':')[1]);
				setSelectedNetworkOption({
					label: networksList[_chainId].name,
					value: _chainId,
				});
			}

			const session = await web3wallet?.approveSession({
				id: proposal.id,
				namespaces: {
					[namespaceKey]: namespace,
				},
			});
			setWeb3WalletSession(session);
			setIsConnected(true);
		},
		[web3wallet],
	);

	const handleSendTransaction = useCallback(
		async (id: number, params: any[], topic?: string) => {
			setSendTxnData((data) => {
				const newTxn = {
					id: id,
					from: params[0].from,
					to: params[0].to,
					data: params[0].data,
					value: params[0].value ? parseInt(params[0].value, 16).toString() : '0',
				};

				if (data.some((d) => d.id === newTxn.id)) {
					return data;
				} else {
					return [newTxn, ...data];
				}
			});

			if (tenderlyForkId.length > 0) {
				const { data: res } = await axios.post('https://rpc.tenderly.co/fork/' + tenderlyForkId, {
					jsonrpc: '2.0',
					id: id,
					method: 'eth_sendTransaction',
					params: params,
				});
				console.log({ res });

				// Approve Call Request
				if (web3wallet && topic) {
					// await web3wallet.respondSessionRequest({
					//   topic,
					//   response: {
					//     jsonrpc: "2.0",
					//     id: res.id,
					//     result: res.result,
					//   },
					// });

					await web3wallet.respondSessionRequest({
						topic,
						response: {
							jsonrpc: '2.0',
							id: id,
							error: {
								code: 0,
								message: 'Method not supported by Impersonator',
							},
						},
					});
				}

				toast({
					title: 'Txn Simulated on Tenderly',
					description: `Hash: ${res.result}`,
					status: 'success',
					position: 'bottom-right',
					duration: null,
					isClosable: true,
				});
			} else {
				if (web3wallet && topic) {
					await web3wallet.respondSessionRequest({
						topic,
						response: {
							jsonrpc: '2.0',
							id: id,
							error: {
								code: 0,
								message: 'Method not supported by Impersonator',
							},
						},
					});
				}
			}
		},
		[tenderlyForkId, web3wallet],
	);

	const onSessionRequest = useCallback(
		async (event) => {
			const { topic, params, id } = event;
			const { request } = params;

			console.log('EVENT', 'session_request', event);

			if (request.method === 'eth_sendTransaction') {
				await handleSendTransaction(id, request.params, topic);
			} else {
				await web3wallet?.respondSessionRequest({
					topic,
					response: {
						jsonrpc: '2.0',
						id: id,
						error: {
							code: 0,
							message: 'Method not supported by Impersonator',
						},
					},
				});
			}
		},
		[web3wallet, handleSendTransaction],
	);

	const onSessionDelete = () => {
		console.log('EVENT', 'session_delete');

		reset();
	};

	const subscribeToEvents = useCallback(async () => {
		console.log('ACTION', 'subscribeToEvents');

		if (web3wallet) {
			web3wallet.on('session_proposal', onSessionProposal);
			try {
				await web3wallet.core.pairing.pair({ uri });
			} catch (e) {
				console.error(e);
			}

			web3wallet.on('session_request', onSessionRequest);

			web3wallet.on('session_delete', onSessionDelete);
		}
	}, [handleSendTransaction, web3wallet]);

	useEffect(() => {
		if (web3wallet) {
			subscribeToEvents();
		}
		return () => {
			// Clean up event listeners
			if (web3wallet) {
				web3wallet.removeListener('session_proposal', onSessionProposal);
				web3wallet.removeListener('session_request', onSessionRequest);
				web3wallet.removeListener('session_delete', onSessionDelete);
			}
		};
	}, [web3wallet, subscribeToEvents]);

	const updateSession = async ({ newChainId, newAddress }: { newChainId?: number; newAddress?: string }) => {
		let _chainId = newChainId || networkId;
		let _address = newAddress || address;

		if (web3wallet && web3WalletSession) {
			await web3wallet.emitSessionEvent({
				topic: web3WalletSession.topic,
				event: {
					name: _chainId !== networkId ? 'chainChanged' : 'accountsChanged',
					data: [_address],
				},
				chainId: `eip155:${_chainId}`,
			});
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	const updateAddress = async () => {
		if (selectedTabIndex === 0) {
			setLoading(true);
		} else {
			setIsIFrameLoading(true);
		}
		const { isValid, _address } = await resolveAndValidateAddress();

		if (isValid) {
			if (selectedTabIndex === 0) {
				updateSession({
					newAddress: _address,
				});
			} else {
				setIFrameAddress(_address);
				setIframeKey((key) => key + 1);
				setIsIFrameLoading(false);
			}
		}
	};

	const updateNetwork = (_networkId: number) => {
		setNetworkId(_networkId);

		if (selectedTabIndex === 0) {
			updateSession({
				newChainId: _networkId,
			});
		} else {
			setIframeKey((key) => key + 1);
		}
	};

	const killSession = async () => {
		console.log('ACTION', 'killSession');

		if (web3wallet && web3WalletSession) {
			setWeb3WalletSession(undefined);
			setUri('');
			setIsConnected(false);

			try {
				await web3wallet.disconnectSession({
					topic: web3WalletSession.topic,
					reason: getSdkError('USER_DISCONNECTED'),
				});
			} catch (e) {
				console.error('killSession', e);
			}
		}
	};

	const reset = (persistUri?: boolean) => {
		setWeb3WalletSession(undefined);
		setIsConnected(false);
		if (!persistUri) {
			setUri('');
		}
		localStorage.removeItem('walletconnect');
	};

	return (
		<>
			<Button key={index} onClick={onOpen}>
				{dapp.name}
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>Hello Iframe</ModalContent>
			</Modal>
		</>
	);
}

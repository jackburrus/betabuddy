import { useWallets } from '@/contexts/WalletsContext';
import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Input,
	HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoSaveSharp } from 'react-icons/io5';

const APP_ID = process.env.NEXT_PUBLIC_NILLION_APP_ID;
const API_BASE = 'https://nillion-storage-apis-v0.onrender.com';

interface Store {
	created_at: string;
	id: number;
	nillion_user_id: string;
	secret_name: string;
	store_id: string;
	ttl_expires_at: string;
}

export default function LoadFromConfig() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [secretPhrase, setSecretPhrase] = useState('');
	const [storeIds, setStoreIds] = useState<Store[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { addWallet } = useWallets();

	const handleUpload = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${API_BASE}/api/apps/${APP_ID}/store_ids`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'User-Seed': secretPhrase,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch store IDs');
			}

			const data = await response.json();
			const fetchedStoreIds: Store[] = data.store_ids;
			console.log('Store IDs:', fetchedStoreIds);
			setStoreIds(fetchedStoreIds);

			// onClose();
		} catch (error) {
			console.error('Error fetching store IDs:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoadSecret = async (store: Store) => {
		try {
			const secretResponse = await fetch(
				`${API_BASE}/api/secret/retrieve/${store.store_id}?retrieve_as_nillion_user_seed=${secretPhrase}&secret_name=${store.secret_name}`,
			);

			if (!secretResponse.ok) {
				throw new Error(`Failed to retrieve secret for store ID: ${store.store_id}`);
			}

			const secretData = await secretResponse.json();
			const secret = secretData.secret;

			console.log(`Secret retrieved for ${store.secret_name}:`, secretData);
			// Iterate over the JSON and add the values for each address key to the wallets context
			if (secret) {
				const parsedSecret = secret.split(',').map((address: string) => address.trim());
				parsedSecret.forEach((address: string) => addWallet({ address }));
				onClose();
			} else {
				console.error('Parsed secret is null or undefined');
			}
		} catch (error) {
			console.error(`Error retrieving secret for ${store.store_id}:`, error);
		}
	};

	return (
		<>
			<Button leftIcon={<IoSaveSharp />} marginLeft={4} onClick={onOpen}>
				Load from Config
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Load from Config</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<HStack spacing={4} mb={4}>
							<Input
								placeholder="Enter secret phrase"
								value={secretPhrase}
								onChange={(e) => setSecretPhrase(e.target.value)}
							/>
							<Button colorScheme="blue" onClick={handleUpload} isLoading={isLoading}>
								Fetch
							</Button>
						</HStack>
						{storeIds.length > 0 && (
							<>
								<h3>Retrieved Watchlists:</h3>
								<ul>
									{storeIds.map((store) => (
										<li
											key={store.store_id}
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												margin: '20px 0',
											}}
										>
											<p>{store.secret_name}</p>
											<div style={{ marginLeft: '10px' }}>
												<Button colorScheme="blue" size="sm" onClick={() => handleLoadSecret(store)}>
													Load
												</Button>
											</div>
										</li>
									))}
								</ul>
							</>
						)}
					</ModalBody>
					<ModalFooter justifyContent="flex-end">
						<Button onClick={onClose} variant="ghost">
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

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
	Textarea,
	Input,
	HStack,
	Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiCloud } from 'react-icons/fi';
import { IoCloudUpload } from 'react-icons/io5';

export default function BulkUpload() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [inputValue, setInputValue] = useState('');
	const [secretPhrase, setSecretPhrase] = useState('');

	const handleUpload = async () => {
		// Log the input values
		// console.log('Uploading:', inputValue);
		// console.log('Secret Phrase:', secretPhrase);
		console.log('APP_ID:', process.env.NEXT_PUBLIC_NILLION_APP_ID);

		// Nillion configuration
		const APP_ID = process.env.NEXT_PUBLIC_NILLION_APP_ID;
		const USER_SEED = secretPhrase; // Using the secret phrase as the user seed
		const API_BASE = 'https://nillion-storage-apis-v0.onrender.com';

		try {
			console.log('\nStoring secret to Nillion...');

			// Prepare the secret value by stringifying the JSON input
			const secretValue = inputValue;

			// Make the POST request to store the secret
			const storeResult = await fetch(`${API_BASE}/api/apps/${APP_ID}/secrets`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					secret: {
						nillion_seed: USER_SEED,
						secret_value: secretValue, // Stringified JSON data
						secret_name: secretPhrase, // Re-using the secret phrase as the secret name
					},
					permissions: {
						retrieve: [],
						update: [],
						delete: [],
						compute: {},
					},
				}),
			});

			// Parse and log the response
			const storeResultJson = await storeResult.json();
			console.log('Secret stored at:', storeResultJson);
		} catch (error) {
			console.error('Error storing secret:', error);
		}

		// Close the modal after upload
		onClose();
	};

	return (
		<>
			<Button leftIcon={<IoCloudUpload />} onClick={onOpen}>
				Bulk Upload
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Bulk Upload</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							placeholder="Enter secret phrase"
							value={secretPhrase}
							onChange={(e) => setSecretPhrase(e.target.value)}
							mb={2}
						/>
						<Text fontSize="xs" color="gray.500" mb={4} textAlign="center">
							Don't forget your secret phrase!
						</Text>
						<Textarea
							placeholder={`0x..., 0x..., 0x...`}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							resize="vertical"
							minHeight="200px"
							padding="4"
						/>
					</ModalBody>
					<ModalFooter justifyContent="flex-end">
						<Button colorScheme="blue" onClick={handleUpload}>
							Upload
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

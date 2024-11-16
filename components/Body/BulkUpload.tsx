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
} from '@chakra-ui/react';
import { useState } from 'react';

export default function BulkUpload() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [inputValue, setInputValue] = useState('');

	const handleUpload = () => {
		// Implement your upload logic here
		console.log('Uploading:', inputValue);
		onClose();
	};

	return (
		<>
			<Button onClick={onOpen}>Bulk Upload</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalFooter justifyContent="flex-end">
						<Button colorScheme="blue" onClick={handleUpload}>
							Upload
						</Button>
					</ModalFooter>
					<Textarea
						placeholder={`{
  "address": "0x...",
  "walletConnectUri": "wc://"
}`}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						resize="vertical"
						minHeight="200px"
						padding="4"
					/>
				</ModalContent>
			</Modal>
		</>
	);
}

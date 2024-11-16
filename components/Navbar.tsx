import { Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/react';
function Navbar() {
	return (
		<Flex py="4" px={['2', '4', '10', '10']} borderBottom="2px" borderBottomColor={'gray.400'}>
			<Spacer flex="1" />
			<Heading maxW={['302px', '4xl', '4xl', '4xl']} fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }} pr="2rem">
				<HStack>
					<Text>🤝</Text>
					<Text>BetaBuddy</Text>
				</HStack>
			</Heading>
		</Flex>
	);
}

export default Navbar;

import { Wallet } from '@/contexts/WalletsContext';
import { Box, Button, Divider, Text } from '@chakra-ui/react';
import { Avatar, Identity, Name, Badge, Address, Socials } from '@coinbase/onchainkit/identity';
import ImpersonateLink from './ImpersonateLink';
import ToggleImpersonationButton from './ToggleImpersonationButton';

export default function WalletCard({ wallet }: { wallet: Wallet }) {
	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
			<Identity address={wallet.address} schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9">
				<Avatar />
				<Name>
					<Badge />
				</Name>
				<Address />
				<Socials />
			</Identity>
			<Box mt={4}>
				<Box display="grid" gridTemplateColumns="repeat(5, 1fr)" marginTop={4} gap={4}>
					{sampleDappLinks.map((dapp, index) => (
						<ImpersonateLink address={wallet.address} index={index} dapp={dapp} />
					))}
				</Box>
				<Divider my={4} />
				<ToggleImpersonationButton wallet={wallet} />
			</Box>
		</Box>
	);
}

const sampleDappLinks = [
	{
		name: 'Morpho',
		url: 'https://app.morpho.org/?network=mainnet',
		icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQiIGhlaWdodD0iNjkiIHZpZXdCb3g9IjAgMCA3NCA2OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEzNTBfMzYpIj4KPHBhdGggZD0iTTguNjQwNjYgNDYuNjI1N1Y2Ni40OTA4QzguNjQwNjYgNjcuNzEzNyA5LjY3NTYxIDY4LjIyMTMgOS45OTc1OSA2OC4zMzY2QzEwLjMxOTYgNjguNDc1MSAxMS40MDA1IDY4Ljc3NSAxMi4zNjY0IDY3Ljg3NTJMMjcuMzk0NCA1My40MzMzQzI4LjY3NDIgNTIuMjAzNiAyOS45MDkzIDUwLjkxMDkgMzAuODM3NSA0OS4zOTg0QzMxLjI3NDQgNDguNjg3NCAzMS40NTU1IDQ4LjI4NjkgMzEuNDU1NSA0OC4yODY5QzMyLjM3NTUgNDYuNDE4IDMyLjM3NTUgNDQuNjE4NCAzMS40NzgyIDQyLjgxODdDMzAuMTQ0OCA0MC4xNDI0IDI2Ljc0MDcgMzcuNDE5OCAyMS42MTE4IDM0LjgzNTdMMTIuODQ5NCAzOS43MjcxQzEwLjI1MDYgNDEuMjAzNyA4LjY0MDY2IDQzLjgxMDkgOC42NDA2NiA0Ni42MjU3WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC44Ii8+CjxwYXRoIGQ9Ik0wIDIuNDQyMTJWMjMuMjc2NEMwIDI1Ljg4MzUgMS43NDc5NCAyOC4xOTA3IDQuMjMxODQgMjguOTI5QzEyLjY5NTQgMzEuMzc0NyAyNy40Mzc1IDM2LjYzNTEgMzEuMDAyNCA0NC4zNjQ0QzMxLjQ2MiA0NS4zNzk1IDMxLjczODEgNDYuMzcxNyAzMS44MzA3IDQ3LjQwOTlDMzQuMTk5NCA0My4wOTU0IDM1LjI4MDMgMzguMTM0OCAzNC43NzQ0IDMzLjEwNTFDMzQuMDg0MSAyNS45NzU4IDMwLjMxMjIgMTkuNDkyNSAyNC40MjQ4IDE1LjM2MjZMMy40MjY4NiAwLjY2NTU1QzMuMDU4ODMgMC4zODg2ODIgMi42MjE4NyAwLjI1MDI0NCAyLjE4NDkgMC4yNTAyNDRDMS44MTY4OCAwLjI1MDI0NCAxLjQ5NDkgMC4zMTk0NjMgMS4xNDk5NCAwLjUwNDA0MkMwLjQ1OTk0NSAwLjg5NjI2OSAwIDEuNjExNTIgMCAyLjQ0MjEyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTY0LjUzNTIgNDYuNjI1N1Y2Ni40OTA4QzY0LjUzNTIgNjcuNzEzNyA2My41MDA2IDY4LjIyMTMgNjMuMTc4MiA2OC4zMzY2QzYyLjg1NjcgNjguNDc1MSA2MS43NzUgNjguNzc1IDYwLjgwOTUgNjcuODc1Mkw0NS40MzE3IDUzLjA5NzVDNDQuMzg0OSA1Mi4wOTEzIDQzLjM4NTMgNTEuMDI3MyA0Mi41OTY4IDQ5LjgwOEM0MS45NzIzIDQ4Ljg0MyA0MS43MjA2IDQ4LjI4NjkgNDEuNzIwNiA0OC4yODY5QzQwLjgwMDUgNDYuNDE4IDQwLjgwMDUgNDQuNjE4NCA0MS42OTcgNDIuODE4N0M0My4wMzEyIDQwLjE0MjQgNDYuNDM1NCAzNy40MTk4IDUxLjU2MzUgMzQuODM1N0w2MC4zMjYzIDM5LjcyNzFDNjIuOTQ4NCA0MS4yMDM3IDY0LjUzNTIgNDMuODEwOSA2NC41MzUyIDQ2LjYyNTdaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjgiLz4KPHBhdGggZD0iTTczLjE5IDIuNDQwNjVWMjMuMjc0OUM3My4xOSAyNS44ODIgNzEuNDQxNiAyOC4xODkyIDY4Ljk1NzYgMjguOTI3NkM2MC40OTQ0IDMxLjM3MzIgNDUuNzUyNCAzNi42MzM3IDQyLjE4NzUgNDQuMzYyOUM0MS43MjcxIDQ1LjM3ODEgNDEuNDUxIDQ2LjM3MDIgNDEuMzU5MiA0Ny40MDg1QzM4Ljk5MDUgNDMuMDk0IDM3LjkwOTYgMzguMTMzNCAzOC40MTU1IDMzLjEwMzdDMzkuMTA0OSAyNS45NzQzIDQyLjg3NjkgMTkuNDkxMSA0OC43NjUxIDE1LjM2MTFMNjkuNzYzMSAwLjY2NDA3N0M3MC4xMzEgMC4zODcyMDkgNzAuNTY3OSAwLjI0ODc3OSA3MS4wMDQ3IDAuMjQ4Nzc5QzcxLjM3MjYgMC4yNDg3NzkgNzEuNjk1IDAuMzE3OTk4IDcyLjAzOTMgMC41MDI1NzdDNzIuNzI5NSAwLjg5NDgwNCA3My4xOSAxLjYxMDA1IDczLjE5IDIuNDQwNjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzEzNTBfMzYiPgo8cmVjdCB3aWR0aD0iNzQiIGhlaWdodD0iNjkiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==',
	},
	{ name: 'Aave', url: 'https://app.aave.com/', icon: 'https://app.aave.com/favicon.ico' },
	{ name: 'Lido', url: 'https://stake.lido.fi/', icon: 'https://stake.lido.fi/favicon.ico' },
];

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
			</Box>
		</Box>
	);
}

const sampleDappLinks = [
	{
		name: 'Aave',
		url: 'https://app.aave.com/',
		icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY2IiBoZWlnaHQ9IjEzOSIgdmlld0JveD0iMCAwIDI2NiAxMzkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05Ny41NDE4IDEzOC41MzNDMTEyLjQ2MSAxMzguNTMzIDEyNC41NTYgMTI2LjQzOCAxMjQuNTU2IDExMS41MThDMTI0LjU1NiA5Ni41OTg3IDExMi40NjEgODQuNTAzOSA5Ny41NDE4IDg0LjUwMzlDODIuNjIyMSA4NC41MDM5IDcwLjUyNzMgOTYuNTk4NyA3MC41MjczIDExMS41MThDNzAuNTI3MyAxMjYuNDM4IDgyLjYyMjEgMTM4LjUzMyA5Ny41NDE4IDEzOC41MzNaIiBmaWxsPSIjOTM5MUY3IiBzdHlsZT0iZmlsbDojOTM5MUY3O2ZpbGw6Y29sb3IoZGlzcGxheS1wMyAwLjU3NjUgMC41Njg2IDAuOTY4Nik7ZmlsbC1vcGFjaXR5OjE7Ii8+CjxwYXRoIGQ9Ik0xNjguMTQ5IDEzOC41MzNDMTgzLjA2OSAxMzguNTMzIDE5NS4xNjQgMTI2LjQzOCAxOTUuMTY0IDExMS41MThDMTk1LjE2NCA5Ni41OTg3IDE4My4wNjkgODQuNTAzOSAxNjguMTQ5IDg0LjUwMzlDMTUzLjIzIDg0LjUwMzkgMTQxLjEzNSA5Ni41OTg3IDE0MS4xMzUgMTExLjUxOEMxNDEuMTM1IDEyNi40MzggMTUzLjIzIDEzOC41MzMgMTY4LjE0OSAxMzguNTMzWiIgZmlsbD0iIzkzOTFGNyIgc3R5bGU9ImZpbGw6IzkzOTFGNztmaWxsOmNvbG9yKGRpc3BsYXktcDMgMC41NzY1IDAuNTY4NiAwLjk2ODYpO2ZpbGwtb3BhY2l0eToxOyIvPgo8cGF0aCBkPSJNMTMyLjggMEM1OS40NDk3IDAgLTAuMDE5MTk1NCA2MC42MDE3IDQuNjQ3ODZlLTA2IDEzNS4zMzVIMzMuOTI2NEMzMy45MjY0IDc5LjMyODEgNzcuODQzMyAzMy45MiAxMzIuOCAzMy45MkMxODcuNzU3IDMzLjkyIDIzMS42NzQgNzkuMzI4MSAyMzEuNjc0IDEzNS4zMzVIMjY1LjZDMjY1LjYxMyA2MC42MDE3IDIwNi4xNDQgMCAxMzIuOCAwWiIgZmlsbD0iIzkzOTFGNyIgc3R5bGU9ImZpbGw6IzkzOTFGNztmaWxsOmNvbG9yKGRpc3BsYXktcDMgMC41NzY1IDAuNTY4NiAwLjk2ODYpO2ZpbGwtb3BhY2l0eToxOyIvPgo8L3N2Zz4K',
	},
	{
		name: 'Defi Saver',
		url: 'https://defisaver.com/',
		icon: 'https://pbs.twimg.com/profile_images/1717844708083347456/02FNBrqO_400x400.jpg',
	},
	{
		name: 'Cow Swap',
		url: 'https://swap.cow.fi/#/1/swap/WETH',
		icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHdpZHRoPSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0iIzQ5MDA3MiIgaGVpZ2h0PSI0MDAiIHJ4PSIyMDAiIHdpZHRoPSI0MDAiLz48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0xNjYuNzc0IDMwNGMtMTMuMzY4IDAtMjUuMTk2LTguNjU1LTI5LjIzNy0yMS4zOTVsLTIwLjc3OS02NS40OTRoLTEyLjc3NGMtMTMuMzY3NyAwLTI1LjE5NTgtOC42NTUtMjkuMjM3My0yMS4zOTVsLTEyLjM0NjMtMzguOTE2aDQ2LjMwOTZsLTI0LjQyNTYtMzYuOGgyMzEuNDMxNmwtMjQuNDI1IDM2LjhoNDYuMzA5bC0xMi4zNDYgMzguOTE2Yy00LjA0MSAxMi43NC0xNS44NyAyMS4zOTUtMjkuMjM3IDIxLjM5NWgtMTIuNzc1bC0yMC43NzggNjUuNDk0Yy00LjA0MSAxMi43NC0xNS44NjkgMjEuMzk1LTI5LjIzNyAyMS4zOTV6bS0xNS42OTgtMTA0Ljc3OGMwIDkuODggNy4zNzggMTcuODg5IDE2LjQ3OCAxNy44ODkgOS4xMDEgMCAxNi40NzktOC4wMDkgMTYuNDc5LTE3Ljg4OXMtNy4zNzgtMTcuODg5LTE2LjQ3OS0xNy44ODljLTkuMSAwLTE2LjQ3OCA4LjAwOS0xNi40NzggMTcuODg5em05Ny44NDkgMGMwIDkuODgtNy4zNzggMTcuODg5LTE2LjQ3OCAxNy44ODktOS4xMDEgMC0xNi40NzktOC4wMDktMTYuNDc5LTE3Ljg4OXM3LjM3OC0xNy44ODkgMTYuNDc5LTE3Ljg4OWM5LjEgMCAxNi40NzggOC4wMDkgMTYuNDc4IDE3Ljg4OXoiIGZpbGw9IiNmOTk2ZWUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==',
	},
	{
		name: 'Balancer',
		url: 'https://balancer.fi/pools',
		icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI5IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOSAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF80MDRfNjQpIj4KPHJlY3QgeD0iMC40NTE3MjEiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iNjQiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNODQuNjA3NSA3MC41ODA0QzEwMi4wOTkgNzMuMTY3MyAxMTQuMzA0IDc5LjAxNzUgMTE0LjMwNCA4NS44MjA4QzExNC4zMDQgOTUuMDIwNSA5MS45ODQzIDEwMi40NzkgNjQuNDUxNiAxMDIuNDc5QzM2LjkxOSAxMDIuNDc5IDE0LjU5OTcgOTUuMDIwNSAxNC41OTk3IDg1LjgyMDhDMTQuNTk5NyA3OS4wMTc1IDI2LjgwNCA3My4xNjczIDQ0LjI5NTcgNzAuNTgwNEM1MC4zMDQgNzEuODAyIDU3LjE2NTYgNzIuNDk0NiA2NC40NTE2IDcyLjQ5NDZDNzEuNTU0OSA3Mi40OTQ2IDc4LjI1NDggNzEuODM2NiA4NC4xNTQ0IDcwLjY3MjVMODQuNjA3NSA3MC41ODA0Wk03Ny4wNjg3IDQzLjE5MDZDOTIuOTExMyA0NC45NTUyIDEwNC4zMzMgNDkuOTQ5OCAxMDQuMzMzIDU1LjgzNjhDMTA0LjMzMyA2My4xOTY1IDg2LjQ3NzcgNjkuMTYzIDY0LjQ1MTYgNjkuMTYzQzQyLjQyNTYgNjkuMTYzIDI0LjU3MDEgNjMuMTk2NSAyNC41NzAxIDU1LjgzNjhDMjQuNTcwMSA0OS45NTAzIDM1Ljk5MiA0NC45NTQ3IDUxLjgzNDYgNDMuMTkxMUM1NS43MTUgNDMuODI1NyA1OS45NzggNDQuMTc2IDY0LjQ1MTYgNDQuMTc2QzY4Ljc2ODUgNDQuMTc2IDcyLjg4OTYgNDMuODQ5NSA3Ni42NiA0My4yNTY2TDc3LjA2ODcgNDMuMTkwNloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik02NC40NTE2IDQxLjUxMDlDODAuOTcxIDQxLjUxMDkgOTQuMzYyNyAzNy4wMzYxIDk0LjM2MjcgMzEuNTE2MkM5NC4zNjI3IDI1Ljk5NjQgODAuOTcxIDIxLjUyMTYgNjQuNDUxNiAyMS41MjE2QzQ3LjkzMjEgMjEuNTIxNiAzNC41NDA0IDI1Ljk5NjQgMzQuNTQwNCAzMS41MTYyQzM0LjU0MDQgMzcuMDM2MSA0Ny45MzIxIDQxLjUxMDkgNjQuNDUxNiA0MS41MTA5WiIgZmlsbD0iYmxhY2siLz4KPC9nPgo8cmVjdCB4PSIwLjk1MTcyMSIgeT0iMC41IiB3aWR0aD0iMTI3IiBoZWlnaHQ9IjEyNyIgcng9IjYzLjUiIHN0cm9rZT0iI0U1RTdFQiIvPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF80MDRfNjQiPgo8cmVjdCB4PSIwLjQ1MTcyMSIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHJ4PSI2NCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
	},
	{
		name: 'Lido',
		url: 'https://app.defisaver.com/',
		icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNjRfMTUyMSkiPgo8ZyBvcGFjaXR5PSIwLjciIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2ZfMTY0XzE1MjEpIj4KPHBhdGggZD0iTTI3MS44OTggNDE0LjcxNEMzNDUuMjk1IDQxNC43MTQgNDA0Ljc5NiAzNTUuNTYzIDQwNC43OTYgMjgyLjU5NkM0MDQuNzk2IDI1NC41OTUgMzk2LjAzMyAyMjguNjI5IDM4MS4wODYgMjA3LjI1OUwyNzEuMDA4IDI3My4xMzdMMTYwLjkzIDIwOS44NjlDMTQ3LjA2OSAyMzAuNzI4IDEzOSAyNTUuNzI1IDEzOSAyODIuNTk2QzEzOSAzNTUuNTYzIDE5OC41IDQxNC43MTQgMjcxLjg5OCA0MTQuNzE0WiIgZmlsbD0idXJsKCNwYWludDBfcmFkaWFsXzE2NF8xNTIxKSIvPgo8cGF0aCBkPSJNMjcxLjg5OCA0MTQuNzE0QzM0NS4yOTUgNDE0LjcxNCA0MDQuNzk2IDM1NS41NjMgNDA0Ljc5NiAyODIuNTk2QzQwNC43OTYgMjU0LjU5NSAzOTYuMDMzIDIyOC42MjkgMzgxLjA4NiAyMDcuMjU5TDI3MS4wMDggMjczLjEzN0wxNjAuOTMgMjA5Ljg2OUMxNDcuMDY5IDIzMC43MjggMTM5IDI1NS43MjUgMTM5IDI4Mi41OTZDMTM5IDM1NS41NjMgMTk4LjUgNDE0LjcxNCAyNzEuODk4IDQxNC43MTRaIiBmaWxsPSJ1cmwoI3BhaW50MV9yYWRpYWxfMTY0XzE1MjEpIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBkPSJNMjcxLjg5OCA0MTQuNzE0QzM0NS4yOTUgNDE0LjcxNCA0MDQuNzk2IDM1NS41NjMgNDA0Ljc5NiAyODIuNTk2QzQwNC43OTYgMjU0LjU5NSAzOTYuMDMzIDIyOC42MjkgMzgxLjA4NiAyMDcuMjU5TDI3MS4wMDggMjczLjEzN0wxNjAuOTMgMjA5Ljg2OUMxNDcuMDY5IDIzMC43MjggMTM5IDI1NS43MjUgMTM5IDI4Mi41OTZDMTM5IDM1NS41NjMgMTk4LjUgNDE0LjcxNCAyNzEuODk4IDQxNC43MTRaIiBmaWxsPSJ1cmwoI3BhaW50Ml9yYWRpYWxfMTY0XzE1MjEpIi8+CjxwYXRoIGQ9Ik0yNzEuODk4IDQxNC43MTRDMzQ1LjI5NSA0MTQuNzE0IDQwNC43OTYgMzU1LjU2MyA0MDQuNzk2IDI4Mi41OTZDNDA0Ljc5NiAyNTQuNTk1IDM5Ni4wMzMgMjI4LjYyOSAzODEuMDg2IDIwNy4yNTlMMjcxLjAwOCAyNzMuMTM3TDE2MC45MyAyMDkuODY5QzE0Ny4wNjkgMjMwLjcyOCAxMzkgMjU1LjcyNSAxMzkgMjgyLjU5NkMxMzkgMzU1LjU2MyAxOTguNSA0MTQuNzE0IDI3MS44OTggNDE0LjcxNFoiIGZpbGw9InVybCgjcGFpbnQzX3JhZGlhbF8xNjRfMTUyMSkiLz4KPHBhdGggZD0iTTE3OC4zMDggMTg2LjEyOEwyNzEuODk4IDIzOS42MjdWNDNMMTc4LjMwOCAxODYuMTI4WiIgZmlsbD0idXJsKCNwYWludDRfcmFkaWFsXzE2NF8xNTIxKSIvPgo8cGF0aCBkPSJNMTc4LjMwOCAxODYuMTI4TDI3MS44OTggMjM5LjYyN1Y0M0wxNzguMzA4IDE4Ni4xMjhaIiBmaWxsPSJ1cmwoI3BhaW50NV9yYWRpYWxfMTY0XzE1MjEpIi8+CjxwYXRoIGQ9Ik0zNjUuMzMyIDE4Ni4xMjhMMjcxLjg5OCAyMzkuNjI3VjQzTDM2NS4zMzIgMTg2LjEyOFoiIGZpbGw9InVybCgjcGFpbnQ2X3JhZGlhbF8xNjRfMTUyMSkiLz4KPHBhdGggZD0iTTM2NS4zMzIgMTg2LjEyOEwyNzEuODk4IDIzOS42MjdWNDNMMzY1LjMzMiAxODYuMTI4WiIgZmlsbD0idXJsKCNwYWludDdfcmFkaWFsXzE2NF8xNTIxKSIvPgo8cGF0aCBkPSJNMzY1LjMzMiAxODYuMTI4TDI3MS44OTggMjM5LjYyN1Y0M0wzNjUuMzMyIDE4Ni4xMjhaIiBmaWxsPSJ1cmwoI3BhaW50OF9saW5lYXJfMTY0XzE1MjEpIiBmaWxsLW9wYWNpdHk9IjAuNiIvPgo8cGF0aCBkPSJNMzgxLjA4NiAyMDcuMjMzTDI3MS44OTggMjcyLjk4MlY0MTQuMDk0TDM4MS4wODYgMjA3LjIzM1oiIGZpbGw9InVybCgjcGFpbnQ5X3JhZGlhbF8xNjRfMTUyMSkiLz4KPHBhdGggZD0iTTM4MS4wODYgMjA3LjIzM0wyNzEuODk4IDI3Mi45ODJWNDE0LjA5NEwzODEuMDg2IDIwNy4yMzNaIiBmaWxsPSJ1cmwoI3BhaW50MTBfcmFkaWFsXzE2NF8xNTIxKSIvPgo8cGF0aCBkPSJNMzgxLjA4NiAyMDcuMjMzTDI3MS44OTggMjcyLjk4MlY0MTQuMDk0TDM4MS4wODYgMjA3LjIzM1oiIGZpbGw9InVybCgjcGFpbnQxMV9yYWRpYWxfMTY0XzE1MjEpIi8+CjxwYXRoIGQ9Ik0xNjAuODM4IDIwOS43MTRMMjcxLjg5OCAyNzIuOTgxVjQxNC4wOTRMMTYwLjgzOCAyMDkuNzE0WiIgZmlsbD0idXJsKCNwYWludDEyX3JhZGlhbF8xNjRfMTUyMSkiLz4KPHBhdGggZD0iTTE2MC44MzggMjA5LjcxNEwyNzEuODk4IDI3Mi45ODFWNDE0LjA5NEwxNjAuODM4IDIwOS43MTRaIiBmaWxsPSJ1cmwoI3BhaW50MTNfcmFkaWFsXzE2NF8xNTIxKSIvPgo8cGF0aCBkPSJNMTYwLjgzOCAyMDkuNzE0TDI3MS44OTggMjcyLjk4MVY0MTQuMDk0TDE2MC44MzggMjA5LjcxNFoiIGZpbGw9InVybCgjcGFpbnQxNF9yYWRpYWxfMTY0XzE1MjEpIi8+CjwvZz4KPHBhdGggZD0iTTI1MC4xMDIgNDM2LjMyM0MzMjMuNSA0MzYuMzIzIDM4MyAzNzcuMTcyIDM4MyAzMDQuMjA1QzM4MyAyNzYuMjA0IDM3NC4yMzggMjUwLjIzOCAzNTkuMjkxIDIyOC44NjhMMjQ5LjIxMiAyOTQuNzQ2TDEzOS4xMzQgMjMxLjQ3OEMxMjUuMjczIDI1Mi4zMzcgMTE3LjIwNCAyNzcuMzM0IDExNy4yMDQgMzA0LjIwNUMxMTcuMjA0IDM3Ny4xNzIgMTc2LjcwNSA0MzYuMzIzIDI1MC4xMDIgNDM2LjMyM1oiIGZpbGw9InVybCgjcGFpbnQxNV9yYWRpYWxfMTY0XzE1MjEpIi8+CjxwYXRoIGQ9Ik0yNTAuMTAyIDQzNi4zMjNDMzIzLjUgNDM2LjMyMyAzODMgMzc3LjE3MiAzODMgMzA0LjIwNUMzODMgMjc2LjIwNCAzNzQuMjM4IDI1MC4yMzggMzU5LjI5MSAyMjguODY4TDI0OS4yMTIgMjk0Ljc0NkwxMzkuMTM0IDIzMS40NzhDMTI1LjI3MyAyNTIuMzM3IDExNy4yMDQgMjc3LjMzNCAxMTcuMjA0IDMwNC4yMDVDMTE3LjIwNCAzNzcuMTcyIDE3Ni43MDUgNDM2LjMyMyAyNTAuMTAyIDQzNi4zMjNaIiBmaWxsPSJ1cmwoI3BhaW50MTZfcmFkaWFsXzE2NF8xNTIxKSIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHBhdGggZD0iTTI1MC4xMDIgNDM2LjMyM0MzMjMuNSA0MzYuMzIzIDM4MyAzNzcuMTcyIDM4MyAzMDQuMjA1QzM4MyAyNzYuMjA0IDM3NC4yMzggMjUwLjIzOCAzNTkuMjkxIDIyOC44NjhMMjQ5LjIxMiAyOTQuNzQ2TDEzOS4xMzQgMjMxLjQ3OEMxMjUuMjczIDI1Mi4zMzcgMTE3LjIwNCAyNzcuMzM0IDExNy4yMDQgMzA0LjIwNUMxMTcuMjA0IDM3Ny4xNzIgMTc2LjcwNSA0MzYuMzIzIDI1MC4xMDIgNDM2LjMyM1oiIGZpbGw9InVybCgjcGFpbnQxN19yYWRpYWxfMTY0XzE1MjEpIi8+CjxwYXRoIGQ9Ik0yNTAuMTAyIDQzNi4zMjNDMzIzLjUgNDM2LjMyMyAzODMgMzc3LjE3MiAzODMgMzA0LjIwNUMzODMgMjc2LjIwNCAzNzQuMjM4IDI1MC4yMzggMzU5LjI5MSAyMjguODY4TDI0OS4yMTIgMjk0Ljc0NkwxMzkuMTM0IDIzMS40NzhDMTI1LjI3MyAyNTIuMzM3IDExNy4yMDQgMjc3LjMzNCAxMTcuMjA0IDMwNC4yMDVDMTE3LjIwNCAzNzcuMTcyIDE3Ni43MDUgNDM2LjMyMyAyNTAuMTAyIDQzNi4zMjNaIiBmaWxsPSJ1cmwoI3BhaW50MThfcmFkaWFsXzE2NF8xNTIxKSIvPgo8cGF0aCBkPSJNMTU2LjUxMiAyMDcuNzM3TDI1MC4xMDIgMjYxLjIzNlY2NC42MDkxTDE1Ni41MTIgMjA3LjczN1oiIGZpbGw9InVybCgjcGFpbnQxOV9yYWRpYWxfMTY0XzE1MjEpIi8+CjxwYXRoIGQ9Ik0xNTYuNTEyIDIwNy43MzdMMjUwLjEwMiAyNjEuMjM2VjY0LjYwOTFMMTU2LjUxMiAyMDcuNzM3WiIgZmlsbD0idXJsKCNwYWludDIwX3JhZGlhbF8xNjRfMTUyMSkiLz4KPHBhdGggZD0iTTM0My41MzYgMjA3LjczN0wyNTAuMTAyIDI2MS4yMzZWNjQuNjA5MUwzNDMuNTM2IDIwNy43MzdaIiBmaWxsPSJ1cmwoI3BhaW50MjFfcmFkaWFsXzE2NF8xNTIxKSIvPgo8cGF0aCBkPSJNMzQzLjUzNiAyMDcuNzM3TDI1MC4xMDIgMjYxLjIzNlY2NC42MDkxTDM0My41MzYgMjA3LjczN1oiIGZpbGw9InVybCgjcGFpbnQyMl9yYWRpYWxfMTY0XzE1MjEpIi8+CjxwYXRoIGQ9Ik0zNDMuNTM2IDIwNy43MzdMMjUwLjEwMiAyNjEuMjM2VjY0LjYwOTFMMzQzLjUzNiAyMDcuNzM3WiIgZmlsbD0idXJsKCNwYWludDIzX2xpbmVhcl8xNjRfMTUyMSkiIGZpbGwtb3BhY2l0eT0iMC42Ii8+CjxwYXRoIGQ9Ik0zNTkuMjkxIDIyOC44NDJMMjUwLjEwMiAyOTQuNTkxVjQzNS43MDNMMzU5LjI5MSAyMjguODQyWiIgZmlsbD0idXJsKCNwYWludDI0X3JhZGlhbF8xNjRfMTUyMSkiLz4KPHBhdGggZD0iTTM1OS4yOTEgMjI4Ljg0MkwyNTAuMTAyIDI5NC41OTFWNDM1LjcwM0wzNTkuMjkxIDIyOC44NDJaIiBmaWxsPSJ1cmwoI3BhaW50MjVfcmFkaWFsXzE2NF8xNTIxKSIvPgo8cGF0aCBkPSJNMzU5LjI5MSAyMjguODQyTDI1MC4xMDIgMjk0LjU5MVY0MzUuNzAzTDM1OS4yOTEgMjI4Ljg0MloiIGZpbGw9InVybCgjcGFpbnQyNl9yYWRpYWxfMTY0XzE1MjEpIi8+CjxwYXRoIGQ9Ik0xMzkuMDQyIDIzMS4zMjNMMjUwLjEwMiAyOTQuNTkxVjQzNS43MDNMMTM5LjA0MiAyMzEuMzIzWiIgZmlsbD0idXJsKCNwYWludDI3X3JhZGlhbF8xNjRfMTUyMSkiLz4KPHBhdGggZD0iTTEzOS4wNDIgMjMxLjMyM0wyNTAuMTAyIDI5NC41OTFWNDM1LjcwM0wxMzkuMDQyIDIzMS4zMjNaIiBmaWxsPSJ1cmwoI3BhaW50MjhfcmFkaWFsXzE2NF8xNTIxKSIvPgo8cGF0aCBkPSJNMTM5LjA0MiAyMzEuMzIzTDI1MC4xMDIgMjk0LjU5MVY0MzUuNzAzTDEzOS4wNDIgMjMxLjMyM1oiIGZpbGw9InVybCgjcGFpbnQyOV9yYWRpYWxfMTY0XzE1MjEpIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZl8xNjRfMTUyMSIgeD0iNjYiIHk9Ii0zMCIgd2lkdGg9IjQxMS43OTYiIGhlaWdodD0iNTE3LjcxNCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIzNi41IiByZXN1bHQ9ImVmZmVjdDFfZm9yZWdyb3VuZEJsdXJfMTY0XzE1MjEiLz4KPC9maWx0ZXI+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgzNzAuNTY2IDM3NS42OTUpIHJvdGF0ZSgtMTQ1LjEzMSkgc2NhbGUoMjQxLjc4NiAzMjMuMzY4KSI+CjxzdG9wIHN0b3AtY29sb3I9IiM4QUZCRUQiIHN0b3Atb3BhY2l0eT0iMCIvPgo8c3RvcCBvZmZzZXQ9IjAuNjcxNDk1IiBzdG9wLWNvbG9yPSIjMDBBM0ZGIiBzdG9wLW9wYWNpdHk9IjAuNDU3MjYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTk4Q0Y2Ii8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQxX3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyMzkuMTEyIDE5MS4zMDMpIHJvdGF0ZSg1Mi44MTA2KSBzY2FsZSgyMzIuNzc3IDE4OS4zNzcpIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzM1QzJGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMEEzRkYiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50Ml9yYWRpYWxfMTY0XzE1MjEiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ1Ljk5NSAyMDEuMzc4KSByb3RhdGUoNTkuMjc3Nikgc2NhbGUoMTAxLjcwNyAxMzAuMzA5KSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzQjUyRkMiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM0I1MkZDIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDNfcmFkaWFsXzE2NF8xNTIxIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDM4Ny44MDkgMTc2Ljg5Nykgcm90YXRlKDkwLjE4OTEpIHNjYWxlKDE1MS4zODQgMTkzLjk1NikiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMkE2QkZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJBNkJGRiIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQ0X3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyNzEuNjg2IDE0MS4wMzkpIHJvdGF0ZSgxNTcuNjgyKSBzY2FsZSgxMTUuMDAzIDI4OC42NDEpIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwQTNGRiIvPgo8c3RvcCBvZmZzZXQ9IjAuOTQzNzE4IiBzdG9wLWNvbG9yPSIjMDBBM0ZGIiBzdG9wLW9wYWNpdHk9IjAuMjkiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDVfcmFkaWFsXzE2NF8xNTIxIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDIzMC40MyA2NS40ODI3KSByb3RhdGUoNzguODE1OCkgc2NhbGUoMTMzLjk0MyAyNDcuNzg1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjcyNzIiLz4KPHN0b3Agb2Zmc2V0PSIwLjE3OTY3NCIgc3RvcC1jb2xvcj0iI0ZGNzJBNyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3QTUxRkYiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50Nl9yYWRpYWxfMTY0XzE1MjEiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYxLjQwNiA0OS45OTQ2KSByb3RhdGUoODQuMTkzMykgc2NhbGUoMzI1LjkyMyAxMzQuMjI5KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRkJGQUIiLz4KPHN0b3Agb2Zmc2V0PSIwLjM2NDgwOCIgc3RvcC1jb2xvcj0iI0ZGNjdBOCIgc3RvcC1vcGFjaXR5PSIwLjg3Ii8+CjxzdG9wIG9mZnNldD0iMC43MjM5NjciIHN0b3AtY29sb3I9IiM2QkFGRkYiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50N19yYWRpYWxfMTY0XzE1MjEiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjcxLjg5OCAyMDguODcyKSByb3RhdGUoLTUwLjMwNTEpIHNjYWxlKDk5LjM0NDQgMTUwLjY2OCkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMjIzOEZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNDdGRiIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQ4X2xpbmVhcl8xNjRfMTUyMSIgeDE9IjM2NS44MjYiIHkxPSIyMTUuODY3IiB4Mj0iMzA0LjM3MyIgeTI9IjE4Ny44ODkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzI5RURGRSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyOUVERkUiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50OV9yYWRpYWxfMTY0XzE1MjEiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjcyLjEwNiAzODguMjYxKSByb3RhdGUoLTY1LjIzNzgpIHNjYWxlKDEzMC40NyAyOTMuNzM2KSI+CjxzdG9wIHN0b3AtY29sb3I9IiM0REVBRkYiLz4KPHN0b3Agb2Zmc2V0PSIwLjk0MzcxOCIgc3RvcC1jb2xvcj0iIzAwQTNGRiIgc3RvcC1vcGFjaXR5PSIwLjEiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDEwX3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyNTUuODQ3IDI5Ni40NzMpIHJvdGF0ZSg5LjYxNTQ3KSBzY2FsZSgxMTguNjQgMTEzLjUzOCkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMzVBQUZGIi8+CjxzdG9wIG9mZnNldD0iMC4wMDAxIiBzdG9wLWNvbG9yPSIjMDA1N0ZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQTNGRiIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQxMV9yYWRpYWxfMTY0XzE1MjEiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzgwLjgxNCAyMDEuMzc4KSByb3RhdGUoMTI1LjcwMSkgc2NhbGUoMTIyLjQzMSA2NC42MjM0KSI+CjxzdG9wIHN0b3AtY29sb3I9IiMyMjQxRkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMUVBMEZGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDEyX3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyNzEuNjg2IDM4OC41Nykgcm90YXRlKC0xMTUuNDAyKSBzY2FsZSgxMjkuNTggMjk3LjIxNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjNjRFM0ZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQTNGRiIgc3RvcC1vcGFjaXR5PSIwLjI5Ii8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQxM19yYWRpYWxfMTY0XzE1MjEiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcwLjk3NiAyNDguMzQ0KSByb3RhdGUoNTAuNzA0MSkgc2NhbGUoMTI2LjA1NCAxMjIuMjA1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzNjg3RkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzU0QkZGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDE0X3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxNjAuOTgzIDIxNS44NjcpIHJvdGF0ZSg0Ni4yNzMpIHNjYWxlKDc5LjUwOCA0My4yMDQ3KSI+CjxzdG9wIHN0b3AtY29sb3I9IiMxODU4RkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM0E3MEZGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDE1X3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgzNDguNzcgMzk3LjMwNCkgcm90YXRlKC0xNDUuMTMxKSBzY2FsZSgyNDEuNzg2IDMyMy4zNjgpIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzhBRkJFRCIgc3RvcC1vcGFjaXR5PSIwIi8+CjxzdG9wIG9mZnNldD0iMC42NzE0OTUiIHN0b3AtY29sb3I9IiMwMEEzRkYiIHN0b3Atb3BhY2l0eT0iMC40NTcyNiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxOThDRjYiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDE2X3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyMTcuMzE2IDIxMi45MTIpIHJvdGF0ZSg1Mi44MTA2KSBzY2FsZSgyMzIuNzc3IDE4OS4zNzcpIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzM1QzJGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMEEzRkYiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MTdfcmFkaWFsXzE2NF8xNTIxIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNC4xOTkgMjIyLjk4Nykgcm90YXRlKDU5LjI3NzYpIHNjYWxlKDEwMS43MDcgMTMwLjMwOSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjM0I1MkZDIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzNCNTJGQyIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQxOF9yYWRpYWxfMTY0XzE1MjEiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzY2LjAxMyAxOTguNTA2KSByb3RhdGUoOTAuMTg5MSkgc2NhbGUoMTUxLjM4NCAxOTMuOTU2KSI+CjxzdG9wIHN0b3AtY29sb3I9IiMyQTZCRkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMkE2QkZGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDE5X3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyNDkuODkgMTYyLjY0OCkgcm90YXRlKDE1Ny42ODIpIHNjYWxlKDExNS4wMDMgMjg4LjY0MSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBBM0ZGIi8+CjxzdG9wIG9mZnNldD0iMC45NDM3MTgiIHN0b3AtY29sb3I9IiMwMEEzRkYiIHN0b3Atb3BhY2l0eT0iMC4yOSIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MjBfcmFkaWFsXzE2NF8xNTIxIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDIwOC42MzQgODcuMDkxOCkgcm90YXRlKDc4LjgxNTgpIHNjYWxlKDEzMy45NDMgMjQ3Ljc4NSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkY3MjcyIi8+CjxzdG9wIG9mZnNldD0iMC4xNzk2NzQiIHN0b3AtY29sb3I9IiNGRjcyQTciLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN0E1MUZGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDIxX3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyMzkuNjEgNzEuNjAzNykgcm90YXRlKDg0LjE5MzMpIHNjYWxlKDMyNS45MjMgMTM0LjIyOSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkZCRkFCIi8+CjxzdG9wIG9mZnNldD0iMC4zNjQ4MDgiIHN0b3AtY29sb3I9IiNGRjY3QTgiIHN0b3Atb3BhY2l0eT0iMC44NyIvPgo8c3RvcCBvZmZzZXQ9IjAuNzIzOTY3IiBzdG9wLWNvbG9yPSIjNkJBRkZGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDIyX3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyNTAuMTAyIDIzMC40ODIpIHJvdGF0ZSgtNTAuMzA1MSkgc2NhbGUoOTkuMzQ0NCAxNTAuNjY4KSI+CjxzdG9wIHN0b3AtY29sb3I9IiMyMjM4RkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA0N0ZGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDIzX2xpbmVhcl8xNjRfMTUyMSIgeDE9IjM0NC4wMyIgeTE9IjIzNy40NzYiIHgyPSIyODIuNTc3IiB5Mj0iMjA5LjQ5OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMjlFREZFIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI5RURGRSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQyNF9yYWRpYWxfMTY0XzE1MjEiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUwLjMxMSA0MDkuODcpIHJvdGF0ZSgtNjUuMjM3OCkgc2NhbGUoMTMwLjQ3IDI5My43MzYpIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzRERUFGRiIvPgo8c3RvcCBvZmZzZXQ9IjAuOTQzNzE4IiBzdG9wLWNvbG9yPSIjMDBBM0ZGIiBzdG9wLW9wYWNpdHk9IjAuMSIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MjVfcmFkaWFsXzE2NF8xNTIxIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDIzNC4wNTIgMzE4LjA4Mikgcm90YXRlKDkuNjE1NDcpIHNjYWxlKDExOC42NCAxMTMuNTM4KSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzNUFBRkYiLz4KPHN0b3Agb2Zmc2V0PSIwLjAwMDEiIHN0b3AtY29sb3I9IiMwMDU3RkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBBM0ZGIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDI2X3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgzNTkuMDE4IDIyMi45ODcpIHJvdGF0ZSgxMjUuNzAxKSBzY2FsZSgxMjIuNDMxIDY0LjYyMzQpIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzIyNDFGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxRUEwRkYiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MjdfcmFkaWFsXzE2NF8xNTIxIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDI0OS44OSA0MTAuMTc5KSByb3RhdGUoLTExNS40MDIpIHNjYWxlKDEyOS41OCAyOTcuMjE1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2NEUzRkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBBM0ZGIiBzdG9wLW9wYWNpdHk9IjAuMjkiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDI4X3JhZGlhbF8xNjRfMTUyMSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxNDkuMTggMjY5Ljk1NCkgcm90YXRlKDUwLjcwNDEpIHNjYWxlKDEyNi4wNTQgMTIyLjIwNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMzY4N0ZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzM1NEJGRiIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQyOV9yYWRpYWxfMTY0XzE1MjEiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjE4NyAyMzcuNDc2KSByb3RhdGUoNDYuMjczKSBzY2FsZSg3OS41MDggNDMuMjA0NykiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMTg1OEZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzNBNzBGRiIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTY0XzE1MjEiPgo8cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgcng9IjIwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=',
	},
];

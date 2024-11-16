import { IndexLayout as IndexLayoutC } from '@/components/layouts/IndexLayout';
import { getMetadata } from '@/utils';

export const metadata = getMetadata({
	title: 'BetaBuddy',
	description: 'BetaBuddy is a platform for testing and developing your products with real users.',
	images: 'https://www.impersonator.xyz/metaIMG.PNG',
});

export default function IndexLayout({ children }: { children: React.ReactNode }) {
	return <IndexLayoutC>{children}</IndexLayoutC>;
}

import { TeoryCard } from './TeoryCard';

import imgHash from '../assets/hash.png';
import imgSteganography from '../assets/steganography.png';
import imgPhishing from '../assets/phishing.png';

export const TeoryList = () => {
	return (
		<div className='grid grid-cols-2 xl:grid-cols-3 gap-4 mt-10'>
			{/* Teory Link Hash */}
			<TeoryCard
				teory='Hash'
				src={imgHash}
				alt={`Teoría de hash`}
				gradientColor='from-orange-500 to-red-500'
			/>

			{/* Teory Link Steganography */}
			<TeoryCard
				teory='Steganography'
				src={imgSteganography}
				alt={`Teoría de esteganografía`}
				gradientColor='from-purple-500 to-pink-500'
			/>

			{/* Teory Link Phishing Identification */}
			<TeoryCard
				teory='Phishing'
				src={imgPhishing}
				alt={`Teoría de identificación de phishing`}
				gradientColor='from-blue-500 to-green-500'
			/>
		</div>
	);
};
import { ExerciseCard } from './ExerciseCard';

import imgHash from '../assets/hash.png';
import imgSteganography from '../assets/steganography.png';
import imgPhishing from '../assets/phishing.png';

export const ExerciseList = () => {
	return (
		<div className='grid grid-cols-2 xl:grid-cols-3 gap-4 mt-10'>
			{/* Exercise Link Hash Easy */}
			<ExerciseCard
				exercise='Hash - Fácil'
				src={imgHash}
				alt={`Ejercicio de hash`}
				gradientColor='from-orange-500 to-red-500'
			/>

			{/* Exercise Link Hash Hard */}
			<ExerciseCard
				exercise='Hash - Difícil'
				src={imgHash}
				alt={`Ejercicio de hash`}
				gradientColor='from-orange-500 to-red-500'
			/>

			{/* Exercise Link Steganography Easy */}
			<ExerciseCard
				exercise='Steganography - Fácil'
				src={imgSteganography}
				alt={`Ejercicio de esteganografía`}
				gradientColor='from-purple-500 to-pink-500'
			/>

			{/* Exercise Link Steganography Hard */}
			<ExerciseCard
				exercise='Steganography - Difícil'
				src={imgSteganography}
				alt={`Ejercicio de esteganografía`}
				gradientColor='from-purple-500 to-pink-500'
			/>

			{/* Exercise Link Phishing Identification Easy */}
			<ExerciseCard
				exercise='Phishing - Fácil'
				src={imgPhishing}
				alt={`Ejercicio de identificación de phishing`}
				gradientColor='from-blue-500 to-green-500'
			/>

			{/* Exercise Link Phishing Identification Hard */}
			<ExerciseCard
				exercise='Phishing - Difícil'
				src={imgPhishing}
				alt={`Ejercicio de identificación de phishing`}
				gradientColor='from-blue-500 to-green-500'
			/>
		</div>
	);
};
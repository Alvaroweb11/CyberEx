import { ExerciseCard } from './ExerciseCard';

import imgHash from '../assets/hash.png';
import imgSteganography from '../assets/steganography.png';

export const ExerciseList = () => {
	return (
		<div className='flex flex-row flex-wrap justify-center gap-4 mt-10'>
			{/* Exercise Link Hash */}
			<ExerciseCard
				exercise='Hash - Fácil'
				src={imgHash}
				alt={`Ejercicio de hash`}
				gradientColor=' from-purple-500 to-pink-500'
			/>
			    
            {/* Exercise Link Steganography */}
            <ExerciseCard
                exercise='Steganography - Difícil'
                src={imgSteganography}
                alt={`Ejercicio de esteganografía`}
                gradientColor=' from-blue-500 to-green-500'
            />
		</div>
	);
};
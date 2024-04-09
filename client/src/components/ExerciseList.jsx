import { imgs, exercises } from '../data';
import { ExerciseCard } from './ExerciseCard';

const [
	imgHash,
	imgSteganography,
] = imgs;

export const ExerciseList = () => {
	return (
		<div className='flex flex-row flex-wrap justify-center gap-4 mt-10'>
			{/* Exercise Link Hash */}
			<ExerciseCard
				exercise={exercises.hash}
				src={imgHash}
				alt={`Ejercicio ${exercises.hash}`}
				gradientColor=' from-purple-500 to-pink-500'
			/>
			    
            {/* Exercise Link Steganography */}
            <ExerciseCard
                exercise={exercises.steganography}
                src={imgSteganography}
                alt={`Ejercicio ${exercises.steganography}`}
                gradientColor=' from-blue-500 to-green-500'
            />
		</div>
	);
};
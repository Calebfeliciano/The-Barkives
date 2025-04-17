import CollarWithTag from "./CollarWithTag";
import { Link } from "react-router-dom";
import "../styles/PetCarousel.css"; 
import { motion } from "framer-motion";

interface PetCarouselProps {
    pets: {
        petId: string;
        name: string;
    }[];
    onSelect?: (petId: string) => void;
}


const PetCarousel: React.FC<PetCarouselProps> = ({ pets, onSelect}) => {
    if (!pets || pets.length === 0) {
        return <div>No pets available</div>;
    }

    return (
        <div className="pet-carousel">
          {pets.map((pet) => (
            <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            key={pet.petId}
            className="pet-item"
            onClick={() => onSelect?.(pet.petId)}
          >
            <Link to={`/pets/${pet.petId}`}>
              <CollarWithTag name={pet.name} />
            </Link>
          </motion.div>
          ))}
        </div>
    );
};

export default PetCarousel;
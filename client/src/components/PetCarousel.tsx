
import CollarWithTag from "./CollarWithTag";
import { Link } from "react-router-dom";

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
            <div
              key={pet.petId}
              className="pet-item"
              onClick={() => onSelect?.(pet.petId)} // Trigger the onSelect callback if provided
            >
              <Link to={`/pets/${pet.petId}`}>
                <CollarWithTag name={pet.name} />
              </Link>
            </div>
          ))}
        </div>
    );
};

export default PetCarousel;

/*
import CollarWithTag from "./CollarWithTag";
import { Link } from "react-router-dom";

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
            <div
              key={pet.petId}
              className="pet-item"
              onClick={() => onSelect?.(pet.petId)} // Trigger the onSelect callback if provided
            >
              <Link to={/pets/${pet.petId}}>
                <CollarWithTag name={pet.name} />
              </Link>
            </div>
          ))}
        </div>
    );
};

export default PetCarousel;
*/
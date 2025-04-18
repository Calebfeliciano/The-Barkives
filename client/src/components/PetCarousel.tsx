import CollarWithTag from "./CollarWithTag";
import { Link } from "react-router-dom";
import "../styles/PetCarousel.css"; 
import { motion, /*useAnimation*/ } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/*
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
*/

interface PetCarouselProps {
  pets: {
    petId: string;
    name: string;
  }[];
  onSelect?: (petId: string) => void;
}

const PetCarousel: React.FC<PetCarouselProps> = ({ pets }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
//  const controls = useAnimation();

  // Auto-scroll effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isHovered) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 1;
        }
      }, 30);
    }
  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.5;
      scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <div className="carousel-wrapper">
      <div
        className="pet-carousel"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {pets.map((pet) => (
          <motion.div
            whileHover={{ rotateY: -10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            key={pet.petId}
            className="pet-item"
          >
            <Link to={`/pets/${pet.petId}`}>
              <CollarWithTag name={pet.name} />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Arrow controls */}
      {isHovered && (
        <>
          <button className="arrow left" onClick={() => handleScroll("left")}>&lt;</button>
          <button className="arrow right" onClick={() => handleScroll("right")}>&gt;</button>
        </>
      )}
    </div>
  );
};

export default PetCarousel;
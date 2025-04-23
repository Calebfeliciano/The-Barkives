import CollarWithTag from "./CollarWithTag";
import { Link } from "react-router-dom";
import "../styles/PetCarousel.css"; 
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

  // Detect if the device is touch-enabled (to avoid auto-scrolling on mobile)
  const isTouchDevice = typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered || isTouchDevice || !scrollRef.current) return;

    const interval = setInterval(() => {
      scrollRef.current!.scrollLeft += 1.5; // Adjust speed as needed
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered, isTouchDevice]);



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
    </div>
  );
};

export default PetCarousel;
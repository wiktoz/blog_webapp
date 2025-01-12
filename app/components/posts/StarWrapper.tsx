import { StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface StarWrapperProps {
    id: number;
    rating: number;
    ratingSetter: (rating: number) => void;
    maxStars?: number;
}

const StarWrapper = ({ id, rating, ratingSetter, maxStars = 5 }: StarWrapperProps) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    return (
        <div className="stars-wrapper flex flex-row cursor-pointer">
            {Array(maxStars)
                .fill(null)
                .map((x, i) => {
                    // Determine the fill color: if hovering, use hoverIndex, otherwise use rating
                    const isFilled = hoverIndex !== null ? i < hoverIndex : i < rating;
                    return (
                        <StarIcon
                            key={"star" + i + "-" + id}
                            className={`star ${isFilled ? "filled" : ""}`}
                            width={22}
                            height={22}
                            strokeWidth={0.8}
                            fill={isFilled ? "gold" : "none"}
                            onMouseEnter={() => setHoverIndex(i + 1)}
                            onMouseLeave={() => setHoverIndex(null)}
                            onClick={() => ratingSetter(i + 1)}
                        />
                    );
                })}
        </div>
    );
};

export default StarWrapper;

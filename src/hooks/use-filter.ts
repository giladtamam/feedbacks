import { useCallback, useMemo, useState } from "react";
import { IFeedback } from "../api/api";

export const useFilterFeedbacks = (feedbacks: IFeedback[]) => {
    const [ratingButtons, setRatingButtons] = useState<boolean[]>([true, true, true, true, true]);
    const [searchTerm, setSearchTerm] = useState('');

    const onRatingChange = useCallback((rating: number) => {
        const selectedRatings = [...ratingButtons];
        selectedRatings[rating - 1] = !selectedRatings[rating - 1];
        setRatingButtons(selectedRatings);
    }, [ratingButtons]);

    const onSearchChange = useCallback((event) => {
        const { value } = event.target;
        setSearchTerm(value);
    }, []);

    const filteredFeedbacks = useMemo(() =>
        feedbacks.filter(({ rating, comment }) => {
            if (!ratingButtons[rating - 1]) {
                return false;
            }

            if (!searchTerm) {
                return true;
            }

            return comment.toLowerCase().includes(searchTerm.toLowerCase());
        }),
        [feedbacks, searchTerm, ratingButtons]);

    return { filteredFeedbacks, searchTerm, ratingButtons, onRatingChange, onSearchChange };
}
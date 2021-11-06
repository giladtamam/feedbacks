import { useEffect, useState } from "react";
import { fetchFeedbackApi, IFeedback } from '../api/api';

export const useFetchFeedback = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<IFeedback[]>([]);
    const [isError, setError] = useState(false);
  
    useEffect(() => {
        const fetchData = async () => {
            const { items: feedbacks, error } = await fetchFeedbackApi();
            if (error) {
                setError(error);
            }
            setData(feedbacks);
            setIsLoading(false);
        };
  
        fetchData();
    }, []);
  
    return { isLoading, feedbacks: data, isError };
  };
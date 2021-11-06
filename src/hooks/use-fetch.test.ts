import { renderHook } from "@testing-library/react-hooks";
import { useFetchFeedback } from './use-fetch';

describe('testing use fetch hook', () => {
    it('check return value', () => {
        const{ result } = renderHook(() => useFetchFeedback());
        expect(result.current.isLoading).toEqual(true);
        expect(result.current.isError).toEqual(false);
        expect(result.current.feedbacks).toEqual([]);    
    });
});



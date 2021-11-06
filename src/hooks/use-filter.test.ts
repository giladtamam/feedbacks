import { act, renderHook } from "@testing-library/react-hooks";
import { useFilterFeedbacks } from './use-filter';

describe('testing use filter hook', () => {
    const feeadbacks = [{
        id: '1',
        rating: '3',
        comment: 'feedback comment 1',
        device: 'Desktop',
        platform: 'Platform1',
        browser: { name: 'Chrome', version: '1.3' }
      }];

      it('feedback comment onSearchChange', () => {
        const{ result } = renderHook(() => useFilterFeedbacks(feeadbacks));
        expect(result.current.searchTerm).toEqual('');
        expect(result.current.filteredFeedbacks.length).toEqual(1);
        expect(result.current.filteredFeedbacks).toEqual(feeadbacks);
        act(() => {
          result.current.onSearchChange({ target: { value: 'comment 2' }});
        });
        expect(result.current.searchTerm).toEqual('comment 2');
        expect(result.current.filteredFeedbacks.length).toEqual(0);
    
    });
    
    it('feedback comment onSearchChange', () => {
      const{ result } = renderHook(() => useFilterFeedbacks(feeadbacks));
      expect(result.current.filteredFeedbacks.length).toEqual(1);
      act(() => {
        result.current.onRatingChange('3');
      });
      expect(result.current.filteredFeedbacks.length).toEqual(0);
      act(() => {
        result.current.onRatingChange('3');
      });
      expect(result.current.filteredFeedbacks.length).toEqual(1);
    });
});



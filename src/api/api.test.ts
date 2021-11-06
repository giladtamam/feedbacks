import { fetchFeedbackApi } from './api';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Testing fetch feedback api', () => {
    it('fecth feedback success', async () => {
        mockedAxios.get.mockResolvedValue({ 
          data: { 
            items: [
              {
                browser: { userAgent: 'sdfsdf' },
                comment: 'feedbcack comment'
              }
            ],
          }
        });
      
        const { error, items } = await fetchFeedbackApi();
        expect(items.length).toEqual(1);
        expect(error).toEqual(false);
      });
      
      it('Fetch feedback failed', async () => {
        mockedAxios.get.mockImplementationOnce(() =>
          Promise.reject(new Error('Error')),
        );
      
        const { error, items } = await fetchFeedbackApi();
        expect(items.length).toEqual(0);
        expect(error).toEqual(true);
    });
});




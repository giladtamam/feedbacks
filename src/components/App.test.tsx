import React from 'react'
import {rest} from 'msw';
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, waitForElement} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App';
import { act } from 'react-dom/test-utils';

const server = setupServer(
  rest.get('https://cache.usabilla.com/example/apidemo.json', (req, res, ctx) => {
    return res(ctx.json(
      { 
        items: [
          {
            "browser": {
              "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36",
              "platform": "MacIntel",
              "language": "fr"
            },
            "comment": "belle offre de services",
            "computed_browser": {
              "Browser": "Chrome",
              "Version": "32.0",
              "Platform": "MacOSX",
              "FullBrowser": "Chrome"
            },
            "computed_location": "France",
            "rating": 5,
          },
        ],
    }))
  }),
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('render no results message on search change', async () => {
  render(<App />);
  await waitFor(() => screen.getByText('belle offre de services'));
  act(() => {  
    const input = screen.getByLabelText('searchLabel');
    fireEvent.change(input, {target: {value: 'asdfasdasdasd'}});
  });
  expect(screen.getByText('No feedback to show!'));
});

test('render no results message on rating change', async () => {
  render(<App />);
  await waitFor(() => screen.getByText('belle offre de services'));
  act(() => {  
    const element = screen.getByTestId('rating-button-5');
    fireEvent.click(element);
  });
  expect(screen.getByText('No feedback to show!'));
});

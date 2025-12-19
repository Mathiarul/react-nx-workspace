import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a dashboard title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('should have a welcome message', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByText(/Welcome back/i)).toBeTruthy();
  });

  it('should display stat cards', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByText('Total Users')).toBeTruthy();
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('Active Projects')).toBeTruthy();
    expect(getByText('Tasks Completed')).toBeTruthy();
  });
});

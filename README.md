# h-lap-assignment

### Back-end Questions

1. Assuming the system currently has three microservices: Customer API, Master Data API,
   and Transaction Data API, there is a new feature that requires data from all three
   microservices to be displayed in near real-time. The current technology stack includes
   REST APIs and an RDBMS database. How would you design a new API for this feature?

Answer :

2. Assuming the team has started planning a new project, the project manager asks you for a
   performance test strategy plan for this release. How would you recommend proceeding to
   the project manager?

Answer :

### React Questions

1. useCallback ใช้ทําอะไร

answer : useCallback เป็น react hook ชนิดหนึ่งที่ใช้ในการ memorize callback function สาเหตุเพราะทุกครั้งที่ component มีการ re-render , callback function จะมีการสร้าง instance ใหม่ขึ้นมา เเทนที่จะใช้ instance เดิม ซึ่งอาจส่งผลต่อ performance ดังนั้นการใช้ useCallback จะช่วยให้ callback function ยังคงเป็น instance เดิม เว้นแต่ dependency จะเปลี่ยนเเปลง

2. Write a unit test for the UserProfile React component using Jest and React Testing
   Library.

answer :

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

// Mock the global fetch function
global.fetch = jest.fn();

describe('UserProfile Component', () => {
const mockUser = {
name: 'John Doe',
email: 'john.doe@example.com'
};

beforeEach(() => {
// Clear all mocks before each test
fetch.mockClear();
});

test('renders loading state initially', () => {
// Create a pending promise to simulate ongoing fetch
const pendingPromise = new Promise(() => {});
fetch.mockImplementation(() => pendingPromise);

    render(<UserProfile userId="123" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

});

test('renders user data successfully', async () => {
// Mock a successful fetch response
fetch.mockImplementation(() =>
Promise.resolve({
ok: true,
json: () => Promise.resolve(mockUser)
})
);

    render(<UserProfile userId="123" />);

    // Wait for the user data to be rendered
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
    });

    // Verify fetch was called with correct URL
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/123');

});

test('renders error state when fetch fails', async () => {
// Mock a failed fetch response
fetch.mockImplementation(() =>
Promise.resolve({
ok: false,
json: () => Promise.reject(new Error('Failed to fetch user data'))
})
);

    render(<UserProfile userId="123" />);

    // Wait for the error message to be rendered
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch user data')).toBeInTheDocument();
    });

});

test('refetches data when userId changes', async () => {
// First render with one user ID
fetch.mockImplementationOnce(() =>
Promise.resolve({
ok: true,
json: () => Promise.resolve(mockUser)
})
);

    const { rerender } = render(<UserProfile userId="123" />);

    // Wait for first render
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Create a new mock user for second render
    const newMockUser = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    };

    // Mock fetch for second render
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(newMockUser)
      })
    );

    // Rerender with a new userId
    rerender(<UserProfile userId="456" />);

    // Wait for new user data to be rendered
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Email: jane.smith@example.com')).toBeInTheDocument();
    });

    // Verify fetch was called twice with different user IDs
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/123');
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/456');

});
});

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to execute API HTTP requests
 */
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('uninest_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API Request Failed');
    }
    return data;
  } catch (err) {
    console.warn(`[API Client Warning] ${endpoint}: ${err.message}`);
    throw err;
  }
}

export const apiService = {
  // Auth
  login: (email, password) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (userData) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => fetchAPI('/auth/me'),

  // Property Listings
  getListings: (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return fetchAPI(`/listings${query ? `?${query}` : ''}`);
  },
  getListingById: (id) => fetchAPI(`/listings/${id}`),
  createListing: (listingData) => fetchAPI('/listings', { method: 'POST', body: JSON.stringify(listingData) }),
  deleteListing: (id) => fetchAPI(`/listings/${id}`, { method: 'DELETE' }),

  // Applications
  submitApplication: (appData) => fetchAPI('/applications', { method: 'POST', body: JSON.stringify(appData) }),
  getStudentApplications: () => fetchAPI('/applications/student'),
  getLandlordApplications: () => fetchAPI('/applications/landlord'),
  updateApplicationStatus: (id, status) => fetchAPI(`/applications/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),

  // Messages
  getMessages: (listingId) => fetchAPI(`/messages/${listingId}`),
  sendMessage: (msgData) => fetchAPI('/messages', { method: 'POST', body: JSON.stringify(msgData) })
};

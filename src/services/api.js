const API_BASE_URL = 'https://order-summary-backend.onrender.com';

// API service class to handle all API calls
class ApiService {
  async fetchOrders(limit = 100, page = 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?limit=${limit}&page=${page}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async fetchOrderById(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch order ${orderId}: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  }

  async syncOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to sync orders: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error syncing orders:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
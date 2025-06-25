import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [initialSyncDone, setInitialSyncDone] = useState(false);

  const fetchOrders = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.fetchOrders(limit, page);
      
      // Handle paginated response
      if (response && response.orders) {
        setOrders(Array.isArray(response.orders) ? response.orders : []);
        setPagination({
          page: response.page || page,
          limit: response.limit || limit,
          total: response.total || 0,
          totalPages: response.totalPages || 1
        });
      } else {
        // Fallback for non-paginated response
        setOrders(Array.isArray(response) ? response : []);
        setPagination({
          page: 1,
          limit: response?.length || 0,
          total: response?.length || 0,
          totalPages: 1
        });
      }
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const syncAndFetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First sync orders
      await apiService.syncOrders();
      
      // Then fetch orders
      await fetchOrders(1, 10);
      setInitialSyncDone(true);
    } catch (err) {
      setError(err.message);
      console.error('Failed to sync and fetch orders:', err);
      setOrders([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    syncAndFetchOrders();
  }, []);

  const refetchOrders = () => {
    fetchOrders(pagination.page, pagination.limit);
  };

  const goToPage = (page) => {
    fetchOrders(page, pagination.limit);
  };

  const changePageSize = (limit) => {
    fetchOrders(1, limit);
  };

  return {
    orders,
    loading,
    error,
    pagination,
    initialSyncDone,
    refetchOrders,
    goToPage,
    changePageSize,
    syncAndFetchOrders
  };
};
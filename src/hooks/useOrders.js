import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const ordersData = await apiService.fetchOrders();
      setOrders(ordersData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const refetchOrders = () => {
    fetchOrders();
  };

  return {
    orders,
    loading,
    error,
    refetchOrders
  };
};
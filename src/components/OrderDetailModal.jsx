import React, { useState, useEffect } from 'react';
import { X, Package, CreditCard, MapPin, Mail, ExternalLink } from 'lucide-react';
import StatusBadge from './StatusBadge';
import LoadingSpinner from './LoadingSpinner';
import { apiService } from '../services/api';

const OrderDetailModal = ({ orderId, isOpen, onClose }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && orderId) {
      fetchOrderDetails();
    }
  }, [isOpen, orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const orderData = await apiService.fetchOrderById(orderId);
      setOrder(orderData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch order details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOrder(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
            <p className="text-sm text-gray-500 mt-1">{orderId}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading && <LoadingSpinner text="Loading order details..." />}
          
          {error && (
            <div className="text-center py-8">
              <p className="text-error-600 mb-4">{error}</p>
              <button
                onClick={fetchOrderDetails}
                className="btn-primary"
              >
                Retry
              </button>
            </div>
          )}

          {order && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Platform</label>
                    <p className="mt-1 text-sm text-gray-900 font-medium">{order.platform}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Order Date</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(order.order_date)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Amount</label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(order.total_amount)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tracking ID</label>
                    <p className="mt-1 text-sm text-gray-900 font-mono">{order.tracking_id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Delivery Status</label>
                    <div className="mt-1">
                      <StatusBadge status={order.delivery_status} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Payment Mode</label>
                    <div className="mt-1 flex items-center text-sm text-gray-900">
                      <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                      {order.payment_mode}
                    </div>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center mb-3">
                  <Package className="h-4 w-4 mr-2" />
                  Items Ordered
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-900">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  Delivery Address
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-900">{order.delivery_address}</p>
                </div>
              </div>

              {/* Email Snippet */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center mb-3">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Preview
                </label>
                <div 
                  className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: order.email_snippet }}
                />
              </div>

              {/* Track Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => window.open(order.tracking_url, '_blank')}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Track Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
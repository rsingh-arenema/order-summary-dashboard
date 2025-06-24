import { Package2, Calendar, DollarSign, Truck } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PropTypes from 'prop-types';

const OrderTable = ({ orders, onOrderClick }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPlatformColor = (platform) => {
    switch (platform.toLowerCase()) {
      case 'amazon':
        return 'text-orange-600 bg-orange-50';
      case 'flipkart':
        return 'text-blue-600 bg-blue-50';
      case 'myntra':
        return 'text-pink-600 bg-pink-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const renderItems = (items) => {
    if (!items || items.length === 0) return 'No items';
    
    // Handle both string arrays and object arrays
    const firstItem = typeof items[0] === 'string' ? items[0] : items[0]?.name || 'Unknown item';
    
    if (items.length > 1) {
      return (
        <div>
          <div>{firstItem}</div>
          <div className="text-xs text-gray-500">
            +{items.length - 1} more item{items.length > 2 ? 's' : ''}
          </div>
        </div>
      );
    }
    
    return firstItem;
  };

  if (orders.length === 0) {
    return (
      <div className="card p-8 text-center">
        <Package2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order.order_id}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => onOrderClick(order)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(order.platform)}`}>
                    {order.platform}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.order_id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(order.order_date)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {renderItems(order.items)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {formatCurrency(order.total_amount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500 font-mono">
                    <Truck className="h-4 w-4 mr-2" />
                    {order.tracking_id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.delivery_status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

OrderTable.propTypes = {
  orders: PropTypes.array.isRequired,
  onOrderClick: PropTypes.func.isRequired,
};

export default OrderTable;
import { useState, useMemo } from 'react';
import { RefreshCw, Package, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { apiService } from '../services/api';
import SearchBar from '../components/SearchBar';
import FilterDropdowns from '../components/FilterDropdowns';
import OrderTable from '../components/OrderTable';
import OrderDetailModal from '../components/OrderDetailModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';
import Pagination from '../components/PaginationDetails';

const Dashboard = () => {
  const { 
    orders, 
    loading, 
    error, 
    pagination, 
    initialSyncDone, 
    refetchOrders, 
    goToPage, 
    changePageSize, 
    syncAndFetchOrders 
  } = useOrders();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  // Get unique platforms and statuses from orders
  const platforms = useMemo(() => {
    const uniquePlatforms = [...new Set(orders.map(order => order.platform))];
    return ['All', ...uniquePlatforms];
  }, [orders]);

  const deliveryStatuses = useMemo(() => {
    const uniqueStatuses = [...new Set(orders.map(order => order.delivery_status))];
    return ['All', ...uniqueStatuses];
  }, [orders]);

  // Filter orders based on search and filter criteria
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.items && order.items.some(item => {
          const itemText = typeof item === 'string' ? item : item?.name || '';
          return itemText.toLowerCase().includes(searchTerm.toLowerCase());
        }));

      // Platform filter
      const matchesPlatform = selectedPlatform === 'All' || order.platform === selectedPlatform;

      // Status filter
      const matchesStatus = selectedStatus === 'All' || order.delivery_status === selectedStatus;

      // Date range filter
      const orderDate = new Date(order.order_date);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;
      
      const matchesDateRange = (!startDate || orderDate >= startDate) && 
                               (!endDate || orderDate <= endDate);

      return matchesSearch && matchesPlatform && matchesStatus && matchesDateRange;
    });
  }, [orders, searchTerm, selectedPlatform, selectedStatus, dateRange]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredOrders.length;
    const delivered = filteredOrders.filter(order => order.delivery_status === 'Delivered').length;
    const pending = filteredOrders.filter(order => order.delivery_status === 'Pending').length;
    const totalAmount = filteredOrders.reduce((sum, order) => sum + order.total_amount, 0);

    return { total, delivered, pending, totalAmount };
  }, [filteredOrders]);

  const handleOrderClick = (order) => {
    setSelectedOrderId(order.order_id);
    setIsModalOpen(true);
  };

  const handleSyncOrders = async () => {
    try {
      setIsSyncing(true);
      const result = await apiService.syncOrders();
      
      // Show success toast
      setToast({
        isVisible: true,
        message: `${result.message} ${result.new_order_count} new orders added.`,
        type: 'success'
      });
      
      // Refresh orders after sync
      refetchOrders();
    } catch (error) {
      setToast({
        isVisible: true,
        message: 'Failed to sync orders. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handlePageChange = (page) => {
    goToPage(page);
  };

  const handlePageSizeChange = (limit) => {
    changePageSize(limit);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const closeToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  if (loading && !initialSyncDone) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Syncing and loading orders..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={syncAndFetchOrders} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Summary Dashboard</h1>
            <p className="mt-2 text-gray-600">Track and manage your e-commerce orders from multiple platforms</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleSyncOrders}
              disabled={isSyncing}
              className={`btn-primary flex items-center ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Orders'}
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8 text-primary-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-success-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-warning-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-primary-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 min-w-0">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            <div className="flex-shrink-0">
              <FilterDropdowns
                selectedPlatform={selectedPlatform}
                onPlatformChange={setSelectedPlatform}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                platforms={platforms}
                statuses={deliveryStatuses}
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card overflow-hidden mb-6">
          <OrderTable 
            orders={filteredOrders}
            onOrderClick={handleOrderClick}
          />
          
          {/* Pagination */}
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>

        {/* Order Detail Modal */}
        <OrderDetailModal
          orderId={selectedOrderId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={closeToast}
        />
      </div>
    </div>
  );
};

export default Dashboard;
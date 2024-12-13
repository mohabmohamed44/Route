import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Package, DollarSign, Calendar, RefreshCw } from 'lucide-react';

// Fetch orders function
async function fetchOrders() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // Get the userId from localStorage
  
  if (!token || !userId) {
    throw new Error('Authentication token or user ID is missing');
  }

  // Dynamically construct the URL using the user ID
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${token}`, {
    headers: { token }
  });

  // Ensure the response is an array
  return Array.isArray(data) ? data : [];
};

export default function AllOrders() {
  const { 
    data: orders = [], // Default to an empty array
    isLoading, 
    isError, 
    error, 
    refetch, 
    isFetching 
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    retry: 2,
    onSuccess: (data) => {
      toast.success(`Found ${data.length} orders`);
    },
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to fetch orders');
      } else if (error.request) {
        toast.error('No response from server. Check your connection.');
      } else {
        toast.error(error.message || 'An unexpected error occurred');
      }
    }
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Package className="animate-bounce text-green-500" size={64} />
          </div>
          <p className="text-xl text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <Package className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Fetching Orders
          </h2>
          <p className="text-gray-600 mb-4">
            {error.message || 'Unable to retrieve your orders'}
          </p>
          <button
            onClick={refetch}
            className="bg-green-500 text-white px-4 py-2 rounded-lg 
            hover:bg-green-600 transition flex items-center justify-center mx-auto"
          >
            <RefreshCw className="mr-2" size={16} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 text-white p-6 flex justify-between items-center">
            <div className="flex items-center">
              <Package className="mr-4" size={40} />
              <h1 className="text-3xl font-bold">My Orders</h1>
            </div>
            {isFetching && (
              <div className="animate-spin">
                <RefreshCw className="text-white" size={24} />
              </div>
            )}
          </div>

          {/* Orders Table or Empty State */}
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-xl text-gray-600">
                You haven't placed any orders yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <DollarSign className="inline mr-2" size={16} />
                      Total Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Calendar className="inline mr-2" size={16} />
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paid Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr 
                      key={order._id} 
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                        ${order.totalOrderPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.isPaid 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          className="text-blue-500 hover:text-blue-700 transition"
                          onClick={() => {
                            // TODO: Implement order details view
                            // navigate(`/order/${order._id}`);
                            toast.info('Order details coming soon');
                          }} 
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

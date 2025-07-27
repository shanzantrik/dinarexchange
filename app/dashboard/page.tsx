'use client'

import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  CreditCard,
  Package,
  Settings,
  LogOut,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield
} from 'lucide-react'

export default function Dashboard() {
  const { user, signOut, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRatesModal, setShowRatesModal] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/signin')
  }

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const data = await response.json()
          setOrders(data.orders || [])
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  // Calculate dynamic stats
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
  const activeOrders = orders.filter(order => 
    ['pending', 'processing', 'packaging', 'shipped'].includes(order.status)
  ).length;
  const accountStatus = user?.email_confirmed_at ? 'Verified' : 'Pending';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-purple-100 text-purple-800'
      case 'packaging':
        return 'bg-indigo-100 text-indigo-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: isAdmin ? 'All Users' : 'Your Orders',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toFixed(2)} AUD`,
      change: isAdmin ? 'All Users' : 'Your Spending',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Orders',
      value: activeOrders.toString(),
      change: isAdmin ? 'All Users' : 'Your Active',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Account Status',
      value: accountStatus,
      change: isAdmin ? 'Admin' : 'Verified',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const recentOrders = [
    {
      id: 'ORD-001',
      currency: 'Iraqi Dinar',
      amount: '1,000,000 IQD',
      status: 'Processing',
      date: '2024-01-15',
      price: '$850'
    },
    {
      id: 'ORD-002',
      currency: 'Zimbabwe Dollar',
      amount: '500,000 ZWL',
      status: 'Shipped',
      date: '2024-01-10',
      price: '$420'
    },
    {
      id: 'ORD-003',
      currency: 'Iraqi Dinar',
      amount: '2,000,000 IQD',
      status: 'Delivered',
      date: '2024-01-05',
      price: '$1,700'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}!
            {isAdmin && <span className="ml-2 text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded-full">Admin</span>}
          </h1>
          <p className="text-gray-600">
            Manage your account, view orders, and track your currency investments.
            {isAdmin && <span className="block mt-1 text-sm text-primary-600">You have administrative privileges.</span>}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              {/* User Profile */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {user?.user_metadata?.full_name || 'User Name'}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {(isAdmin ? [
                  { id: 'overview', label: 'Overview', icon: Package },
                  { id: 'profile', label: 'Profile', icon: User }
                ] : [
                  { id: 'overview', label: 'Overview', icon: Package },
                  { id: 'orders', label: 'My Orders', icon: CreditCard },
                  { id: 'profile', label: 'Profile', icon: User }
                ]).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}

                {isAdmin && (
                  <a
                    href="/admin/orders"
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-orange-600 hover:bg-orange-50"
                  >
                    <Package className="w-5 h-5" />
                    <span className="font-medium">Manage Orders</span>
                  </a>
                )}
              </nav>

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 mt-6 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                          <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Orders */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {isAdmin ? 'Recent Orders' : 'My Orders'}
                    </h2>
                  </div>
                  <div className="p-6">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading orders...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          {isAdmin ? 'No orders found' : 'No orders yet'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order: any, index) => (
                          <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-primary-100 rounded-lg">
                                <Package className="w-5 h-5 text-primary-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">#{order.order_number}</p>
                                <p className="text-sm text-gray-600">{order.quantity} {order.currency_type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">${order.total_amount.toFixed(2)} AUD</p>
                              <p className="text-sm text-gray-600">{order.payment_method}</p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <p className="text-sm text-gray-600 mt-1">
                                {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {orders.length > 5 && !isAdmin && (
                      <div className="mt-6 text-center">
                        <button 
                          onClick={() => setActiveTab('orders')}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          View All Orders →
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => router.push('/buy-dinar')}
                      className="p-4 border-2 border-dashed border-primary-300 rounded-lg text-primary-600 hover:border-primary-400 hover:bg-primary-50 transition-colors"
                    >
                      <Package className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">Place New Order</p>
                    </button>
                    <button 
                      onClick={() => setShowRatesModal(true)}
                      className="p-4 border-2 border-dashed border-orange-300 rounded-lg text-orange-600 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                    >
                      <CreditCard className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">View Rates</p>
                    </button>
                    <button 
                      onClick={() => router.push('/contact')}
                      className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <Shield className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">Contact Support</p>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No orders yet</p>
                    <button
                      onClick={() => router.push('/buy-dinar')}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Place Your First Order
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">#{order.order_number}</h3>
                            <p className="text-sm text-gray-600">{order.quantity} {order.currency_type}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${order.total_amount.toFixed(2)} AUD</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <p><strong>Payment Method:</strong> {order.payment_method}</p>
                            <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p><strong>Customer:</strong> {order.customer_info?.fullName || 'N/A'}</p>
                            <p><strong>Email:</strong> {order.user_email}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View Details
                          </button>
                          {order.status === 'pending' && (
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                      </h3>
                      <p className="text-gray-600">{user?.email}</p>
                      {isAdmin && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mt-1">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Account Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="text-gray-900">{user?.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member Since:</span>
                        <span className="text-gray-900">
                          {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Sign In:</span>
                        <span className="text-gray-900">
                          {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email Verified:</span>
                        <span className={`${user?.email_confirmed_at ? 'text-green-600' : 'text-red-600'}`}>
                          {user?.email_confirmed_at ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Account Actions</h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => router.push('/contact')}
                        className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-900">Contact Support</p>
                            <p className="text-sm text-blue-700">Get help with your account</p>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                            // TODO: Implement account deletion
                            alert('Account deletion feature coming soon. Please contact support.');
                          }
                        }}
                        className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <div>
                            <p className="font-medium text-red-900">Delete Account</p>
                            <p className="text-sm text-red-700">Permanently delete your account and data</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Rates Modal */}
      {showRatesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Current Exchange Rates</h2>
              <button
                onClick={() => setShowRatesModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Iraqi Dinar Rates */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Iraqi Dinar (IQD)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { quantity: "50,000", price: 45.00 },
                  { quantity: "100,000", price: 85.00 },
                  { quantity: "250,000", price: 200.00 },
                  { quantity: "500,000", price: 375.00 },
                  { quantity: "1,000,000", price: 700.00 },
                  { quantity: "2,500,000", price: 1650.00 },
                  { quantity: "5,000,000", price: 3200.00 },
                  { quantity: "10,000,000", price: 6200.00 },
                  { quantity: "25,000,000", price: 15000.00 },
                  { quantity: "50,000,000", price: 29000.00 },
                  { quantity: "100,000,000", price: 56000.00 },
                  { quantity: "250,000,000", price: 135000.00 }
                ].map((rate, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900">{rate.quantity} IQD</div>
                    <div className="text-primary-600 font-bold">${rate.price.toFixed(2)} AUD</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zimbabwe Dollar Rates */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Zimbabwe Dollar (ZIM)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { quantity: "10,000", price: 45.00 },
                  { quantity: "25,000", price: 95.00 },
                  { quantity: "50,000", price: 175.00 },
                  { quantity: "100,000", price: 325.00 },
                  { quantity: "250,000", price: 750.00 },
                  { quantity: "500,000", price: 1400.00 },
                  { quantity: "1,000,000", price: 2600.00 },
                  { quantity: "2,500,000", price: 6000.00 },
                  { quantity: "5,000,000", price: 11500.00 },
                  { quantity: "10,000,000", price: 22000.00 },
                  { quantity: "25,000,000", price: 52000.00 },
                  { quantity: "50,000,000", price: 100000.00 }
                ].map((rate, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900">{rate.quantity} ZIM</div>
                    <div className="text-blue-600 font-bold">${rate.price.toFixed(2)} AUD</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All prices are in AUD (Australian Dollars)</li>
                <li>• Payment accepted via Bank Transfer, PayID, or Cash</li>
                <li>• Orders shipped within 5-7 business days</li>
                <li>• Registered post with tracking via NZ Post</li>
                <li>• 100% authentic currency notes guaranteed</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/buy-dinar')}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors mr-4"
              >
                Buy Iraqi Dinar
              </button>
              <button
                onClick={() => router.push('/buy-zim')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buy Zimbabwe Dollar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Search, AlertCircle, Clock, CheckCircle, X, LogOut } from 'lucide-react';
import { string } from 'zod';
import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/auth';
import ResolvingTicket from '@/components/resolving-ticket';

interface User {
  id: string;
  name: string;
  email: string;
  ticketCount?: number;
  lastActivity?: string;
  createdAt?: string;
  profilePic?: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority:'high' | 'medium' | 'low';
  status: 'open' | 'pending' | 'resolved' | 'closed';
  created_at: string;
  updated_at: string;
  userId: string;
  ticketNumber: string;
  category?: string;
  assignedTo?: string;
}

const AdminTicketDashboard = () => {
  const [currentView, setCurrentView] = useState<'users' | 'tickets'>('users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'updated_at' | 'priority' | 'status'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const userdata = useCurrentUser()
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const { data } = await response.json();
      setUsers(data.map((userData: any) => ({
        ...userData.user,
        ticketCount: userData.tickets?.length || 0,
        lastActivity: userData.tickets?.[0]?.updated_at
      })));
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };
const openModal = (ticket: any) => {
  setSelectedTicket(ticket);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedTicket(null);
  setIsModalOpen(false);
};
  const fetchTickets = async (userId: string | null = null) => {
    setLoading(true);
    setError(null);
    try {
      const url = userId 
        ? `/api/admin/users?userId=${userId}` 
        : '/api/admin/users';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch tickets');
      const { data } = await response.json();
      
      const ticketsData = userId 
        ? data.find((u: any) => u.user.id === userId)?.tickets || []
        : data.flatMap((user: any) => user.tickets || []);
      
      setTickets(ticketsData);
    } catch (err) {
      setError('Failed to load tickets');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: Ticket['status']) => {
    try {
      const response = await fetch(`/api/tickets/status?userId=${userdata?.id}&ticketId=${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update ticket status');

      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: newStatus, updated_at: new Date().toISOString() }
          : ticket
      ));

      if (currentView === 'users') {
        fetchUsers();
      }
    } catch (err) {
      setError('Failed to update ticket status');
      console.error('Error updating ticket:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setCurrentView('tickets');
    fetchTickets(user.id);
  };

  const handleBackToUsers = () => {
    setCurrentView('users');
    setSelectedUser(null);
    setSearchTerm('');
    setPriorityFilter('all');
    setStatusFilter('all');
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
const handleLogout = async()=>{
   await signOut()
  }
  const filteredTickets = tickets
    .filter(ticket => {
      if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) return false;
      if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
      if (searchTerm && 
          !ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !ticket.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      let aVal :any= a[sortBy];
      let bVal :any= b[sortBy];
      
      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aVal = String(new Date(aVal).getTime());
        bVal = String(new Date(bVal).getTime());
      } else if (sortBy === 'priority') {
        const priorityOrder = ['critical', 'high', 'medium', 'low'];
        aVal = priorityOrder.indexOf(a.priority);
        bVal = priorityOrder.indexOf(b.priority);
      } else if (sortBy === 'status') {
        const statusOrder = ['open', 'pending', 'resolved', 'closed'];
        aVal = statusOrder.indexOf(a.status);
        bVal = statusOrder.indexOf(b.status);
      }
      
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {currentView === 'tickets' && (
                  <button
                    onClick={handleBackToUsers}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Users</span>
                  </button>
                )}
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentView === 'users' ? 'User Management' : `Tickets for ${selectedUser?.name}`}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={currentView === 'users' ? 'Search users...' : 'Search tickets...'}
                    value={searchTerm}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <LogOut 
                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" 
                onClick={handleLogout}
              />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters for Tickets View */}
        {currentView === 'tickets' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Priorities</option>
                
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="created_at">Created Date</option>
                <option value="updated_at">Updated Date</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
              </select>

              {/* <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
              </button> */}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {/* Users View */}
        {!loading && currentView === 'users' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.profilePic ? (
                            <img 
                              src={user.profilePic} 
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">
                              Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.ticketCount && user.ticketCount > 0 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.ticketCount || 0} tickets
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActivity ? new Date(user.lastActivity).toLocaleString() : 'No activity'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleUserClick(user)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          disabled={!user.ticketCount || user.ticketCount === 0}
                        >
                          {user.ticketCount ? 'View Tickets' : 'No Tickets'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tickets View */}
        {!loading && currentView === 'tickets' && (
          <div className="space-y-4">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"  onClick={() => openModal(ticket)}
   
  >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          #{ticket.ticketNumber} - {ticket.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </span>
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          <span>{ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</span>
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{ticket.description}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>Created: {new Date(ticket.created_at).toLocaleString()}</span>
                        <span>Updated: {new Date(ticket.updated_at).toLocaleString()}</span>
                        {ticket.category && <span>Category: {ticket.category}</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <select
                        value={ticket.status}
                        onChange={(e) => updateTicketStatus(ticket.id, e.target.value as Ticket['status'])}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">
                    {tickets.length === 0 ? 'No tickets found' : 'No matching tickets'}
                  </h3>
                  <p>
                    {tickets.length === 0 
                      ? 'This user has not created any tickets yet.'
                      : 'No tickets match your current filters.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {isModalOpen && selectedTicket && (
  <ResolvingTicket ticket={selectedTicket} onClose={closeModal} userId={''} />
)}
    </div>
  );
};

export default AdminTicketDashboard;
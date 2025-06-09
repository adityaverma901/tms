'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Ticket, User, Bell, Settings, LogOut, Clock, CheckCircle, AlertCircle, XCircle, Paperclip, X } from 'lucide-react';
import { useCurrentUser } from '@/hooks/auth';
import { signOut } from 'next-auth/react';
import TicketModal from '@/components/TicketModal';
import { UploadButton } from "@/utils/uploadthing";

interface TicketType {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  // attachment?: string[]; // Add attachments field
  attachment:any;
}

interface UserType {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const users = useCurrentUser();

  const [activeSection, setActiveSection] = useState('create');
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // Track uploaded files

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    category: 'TECHNICAL',
    attachments: [] as string[] // Add attachments to ticket state
  });

  // Load user data and tickets on component mount
  useEffect(() => {
    const loadUserData = () => {
      const userName = users?.name;
      const userEmail = users?.email;
      const userId = users?.id;

      if (!userName) {
        router.push('/auth/signin');
        return;
      }

      setUser({
        id: userId || '',
        name: userName,
        email: userEmail || ''
      });
    };

    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/tickets?userId=${users?.id}`);

        if (response.ok) {
          const data = await response.json();
          setTickets(data.tickets);
        } else {
          setError('Failed to load tickets');
        }
      } catch (err) {
        setError('Error fetching tickets');
        console.error('Fetch tickets error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (users) {
      loadUserData();
    }
    fetchTickets();
  }, [router, users]);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'OPEN': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'IN_PROGRESS': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'CLOSED': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <XCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'OPEN': return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'CLOSED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle file upload success
  const handleUploadComplete = (res: any) => {
    console.log("Files uploaded: ", res);
    const fileUrls = res.map((file: any) => file.url);
    setUploadedFiles([...uploadedFiles, ...fileUrls]);
    setNewTicket({
      ...newTicket,
      attachments: [...newTicket.attachments, ...fileUrls]
    });
  };

  // Handle file upload error
  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
    setError(`Upload failed: ${error.message}`);
  };

  // Remove uploaded file
  const removeUploadedFile = (fileUrl: string) => {
    const updatedFiles = uploadedFiles.filter(url => url !== fileUrl);
    setUploadedFiles(updatedFiles);
    setNewTicket({
      ...newTicket,
      attachments: updatedFiles
    });
  };

  // Extract filename from URL
  const getFileName = (url: string) => {
    return url.split('/').pop() || 'file';
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTicket.title || !newTicket.description) {
      setError('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch(`/api/tickets?userId=${users?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTicket)
      });

      if (response.ok) {
        const data = await response.json();
        setTickets([data.ticket, ...tickets]);
        setNewTicket({
          title: '',
          description: '',
          priority: 'MEDIUM',
          category: 'TECHNICAL',
          attachments: []
        });
        setUploadedFiles([]); // Clear uploaded files
        setActiveSection('tickets');
        setError('');
      } else {
        setError('Failed to create ticket');
      }
    } catch (err) {
      setError('Error creating ticket');
      console.error('Create ticket error:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'OPEN'.toLowerCase()).length,
    inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    closed: tickets.filter(t => t.status === 'CLOSED'.toLowerCase()).length
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Ticket className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Support Desk</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              <Settings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-gray-500 bg-gray-200 rounded-full p-1" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </div>
              <LogOut 
                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" 
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Ticket className="w-8 h-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.closed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveSection('create')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'create'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Create New Ticket
          </button>
          <button
            onClick={() => setActiveSection('tickets')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'tickets'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            My Tickets ({tickets.length})
          </button>
        </div>

        {/* Create Ticket View */}
        {activeSection === 'create' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Create New Ticket</h2>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Title *
                  </label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="TECHNICAL">Technical</option>
                    <option value="ACCOUNT">Account</option>
                    <option value="BILLING">Billing</option>
                    <option value="ENHANCEMENT">Enhancement</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide detailed information about your issue"
                    required
                  />
                </div>

                {/* File Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Paperclip className="w-4 h-4 inline mr-1" />
                    Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <UploadButton
                        endpoint="imageUploader"
                      onClientUploadComplete={handleUploadComplete}
                      onUploadError={handleUploadError}
                      // appearance={{
                      //   button: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      //   container: "w-full flex justify-center",
                      // }}
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Upload screenshots, documents, or other files to help describe your issue
                    </p>
                  </div>

                  {/* Display uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((fileUrl, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <div className="flex items-center">
                              <Paperclip className="w-4 h-4 text-gray-400 mr-2" />
                              <a 
                                href={fileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                <img src={fileUrl} alt="" />
                                
                              </a>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeUploadedFile(fileUrl)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('tickets');
                      setUploadedFiles([]);
                      setNewTicket({
                        title: '',
                        description: '',
                        priority: 'MEDIUM',
                        category: 'TECHNICAL',
                        attachments: []
                      });
                    }}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tickets View */}
        {activeSection === 'tickets' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">My Tickets</h2>
              <p className="text-sm text-gray-600 mt-1">Track and manage your support tickets</p>
            </div>
            
            {tickets.length === 0 ? (
              <div className="p-8 text-center">
                <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No tickets found</p>
                <button
                  onClick={() => setActiveSection('create')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Your First Ticket
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTicket(ticket)}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ticket.id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                              {ticket.subject}
                              {ticket.attachment && ticket.attachment.length > 0 && (
                                <Paperclip className="w-4 h-4 text-gray-400 ml-2" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{ticket.description.slice(0, 50)}...</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(ticket.status)}
                            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('_', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(ticket.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
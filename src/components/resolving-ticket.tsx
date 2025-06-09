'use client';

import { useCurrentUser } from '@/hooks/auth';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  attachment: string[] | null;
}

interface Message {
  id: string;
  ticketId: string;
  senderId: string;
  direction: 'user_to_admin' | 'admin_to_user';
  message: string;
  attachments?: any;
  isRead: boolean;
  createdAt: string;
  sender?: {
    id: string;
    name: string;
    profilePic?: string;
  };
}

interface Props {
  ticket: Ticket;
  onClose: () => void;
  onResolve?: () => void;
  userId: string;
}

const ResolvingTicket: React.FC<Props> = ({ ticket, onClose, onResolve, userId }) => {
  const [resolutionMessage, setResolutionMessage] = useState('');
  const [priority, setPriority] = useState(ticket.priority);
  const [status, setStatus] = useState(ticket.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const user = useCurrentUser();

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, [ticket.id]);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const response = await fetch(`/api/ticket-messages?ticketId=${ticket.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessages(data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in progress':
      case 'working':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'resolved':
      case 'closed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'bug':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'feature':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'support':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'enhancement':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const handleSendMessage = async () => {
    if (!resolutionMessage.trim()) {
      setError('Please enter a message');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const messageResponse = await fetch('/api/ticket-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: ticket.id,
          senderId: user?.id,
          direction: 'admin_to_user',
          message: resolutionMessage,
          isRead: false,
          updateTicket: {
            status: status,
            priority: priority
          }
        }),
      });

      if (!messageResponse.ok) {
        throw new Error('Failed to send message');
      }

      const messageData = await messageResponse.json();
      
      if (messageData.success) {
        // Add new message to local state
        const newMessage: Message = {
          id: messageData.data.id,
          ticketId: ticket.id,
          senderId: user?.id || '',
          direction: 'admin_to_user',
          message: resolutionMessage,
          isRead: false,
          createdAt: new Date().toISOString(),
          sender: {
            id: user?.id || '',
            name: user?.name || 'Admin',
            // profilePic: user?.profilePic
          }
        };
        
        setMessages(prev => [...prev, newMessage]);
        setResolutionMessage('');
        
        if (onResolve) onResolve();
      } else {
        throw new Error(messageData.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl z-10"
          >
            ×
          </button>
          <h2 className="text-xl font-semibold text-gray-900 pr-8">
            {ticket.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Ticket #{ticket.id}
          </p>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Ticket Details */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Description */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <div className="text-gray-700 text-sm max-h-32 overflow-y-auto bg-gray-50 p-3 rounded border">
                  {ticket.description}
                </div>
              </div>

              {/* Status and Priority */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`px-3 py-1 text-sm rounded border ${getStatusColor(status)} w-full`}
                    disabled={isSubmitting}
                  >
                    <option value="open">Open</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={`px-3 py-1 text-sm rounded border ${getPriorityColor(priority)} w-full`}
                    disabled={isSubmitting}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <span className={`inline-block px-3 py-1 text-sm rounded border capitalize ${getCategoryColor(ticket.category)}`}>
                  {ticket.category}
                </span>
              </div>

              {/* Attachments */}
              {ticket.attachment && ticket.attachment.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded p-2">
                    {ticket.attachment.map((item, index) => (
                      <div key={index} className="flex-shrink-0">
                        <Image 
                          src={item} 
                          height={150} 
                          width={150} 
                          alt={`Attachment ${index + 1}`}
                          className="rounded border border-gray-300 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage(item)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Chat */}
          <div className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {loadingMessages ? (
                <div className="flex justify-center items-center h-32">
                  <div className="text-gray-500">Loading messages...</div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-32">
                  <div className="text-gray-500">No messages yet. Start the conversation!</div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => {
                    const isAdmin = message.direction === 'admin_to_user';
                    const showDate = index === 0 || 
                      formatDate(messages[index - 1].createdAt) !== formatDate(message.createdAt);

                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                        )}
                        
                        <div className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            isAdmin 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}>
                            <div className="text-sm break-words">
                              {message.message}
                            </div>
                            <div className={`text-xs mt-1 ${
                              isAdmin ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <textarea
                  value={resolutionMessage}
                  onChange={(e) => setResolutionMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isSubmitting}
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!resolutionMessage.trim() || isSubmitting}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 self-end"
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
              {error && (
                <div className="mt-2 text-sm text-red-500">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[60]"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Full size attachment"
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResolvingTicket;
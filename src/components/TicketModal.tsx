// // // components/TicketModal.tsx
// // 'use client';
// // import React from 'react';
// // import { X } from 'lucide-react';

// // interface TicketType {
// //   id: string;
// //   title: string;
// //   description: string;
// //   status: string;
// //   priority: string;
// //   category: string;
// //   createdAt: string;
// // }

// // interface TicketModalProps {
// //   ticket: TicketType;
// //   onClose: () => void;
// // }

// // const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
// //       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
// //         <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
// //           <X />
// //         </button>
// //         <h2 className="text-xl font-bold mb-4">{ticket.title}</h2>
// //         {/* <p className="text-sm text-gray-600 mb-2"><strong>ID:</strong> {ticket.id}</p> */}
// //         <p className="text-sm text-gray-600 mb-2"><strong>Category:</strong> {ticket.category}</p>
// //         <p className="text-sm text-gray-600 mb-2"><strong>Priority:</strong> {ticket.priority}</p>
// //         <p className="text-sm text-gray-600 mb-2"><strong>Status:</strong> {ticket.status}</p>
// //         <p className="text-sm text-gray-600 mb-2"><strong>Date:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
// //         <p className="mt-4 text-gray-800">{ticket.description}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TicketModal;
// // components/TicketModal.tsx
// 'use client';
// import React from 'react';
// import { X } from 'lucide-react';

// interface TicketType {
//   id: string;
//   title: string;
//   description: string;
//   status: string;
//   priority: string;
//   category: string;
//   createdAt: string;
// }

// interface TicketModalProps {
//   ticket: TicketType;
//   onClose: () => void;
// }

// const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
//   // Helper function to get priority color
//   const getPriorityColor = (priority: string) => {
//     switch (priority.toLowerCase()) {
//       case 'high': return 'bg-red-100 text-red-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Helper function to get status color
//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'open': return 'bg-blue-100 text-blue-800';
//       case 'in progress': return 'bg-purple-100 text-purple-800';
//       case 'resolved': return 'bg-green-100 text-green-800';
//       case 'closed': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-scaleIn">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-bold">{ticket.title}</h2>
//             <button 
//               onClick={onClose} 
//               className="p-1 rounded-full hover:bg-blue-400 transition-colors duration-200"
//               aria-label="Close modal"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//           <p className="text-sm opacity-90 mt-1">
//             Created: {new Date(ticket.createdAt).toLocaleString()}
//           </p>
//         </div>

//         {/* Body */}
//         <div className="p-6">
//           {/* Meta information */}
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div>
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</p>
//               <p className="text-sm font-medium mt-1">{ticket.category}</p>
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</p>
//               <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full mt-1 inline-block ${getPriorityColor(ticket.priority)}`}>
//                 {ticket.priority}
//               </span>
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</p>
//               <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full mt-1 inline-block ${getStatusColor(ticket.status)}`}>
//                 {ticket.status}
//               </span>
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</p>
//             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//               <p className="text-gray-700 whitespace-pre-line">{ticket.description}</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="bg-gray-50 px-6 py-3 flex justify-end border-t border-gray-200">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketModal;
'use client';

import { useCurrentUser } from '@/hooks/auth';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Paperclip } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  attachment: string[] | null;
  createdAt: string;
  userId?: string;
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
  onUpdate?: () => void;
  isAdmin?: boolean;
}

const TicketModal: React.FC<Props> = ({ ticket, onClose, onUpdate, isAdmin = false }) => {
  const [newMessage, setNewMessage] = useState('');
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
    if (!newMessage.trim()) {
      setError('Please enter a message');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const direction = isAdmin ? 'admin_to_user' : 'user_to_admin';
      
      const messageResponse = await fetch('/api/ticket-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: ticket.id,
          senderId: user?.id,
          direction: direction,
          message: newMessage,
          isRead: false,
        }),
      });

      if (!messageResponse.ok) {
        throw new Error('Failed to send message');
      }

      const messageData = await messageResponse.json();
      
      if (messageData.success) {
        // Add new message to local state
        const newMessageObj: Message = {
          id: messageData.data.id,
          ticketId: ticket.id,
          senderId: user?.id || '',
          direction: direction,
          message: newMessage,
          isRead: false,
          createdAt: new Date().toISOString(),
          sender: {
            id: user?.id || '',
            name: user?.name || (isAdmin ? 'Admin' : 'User'),
          }
        };
        
        setMessages(prev => [...prev, newMessageObj]);
        setNewMessage('');
        
        if (onUpdate) onUpdate();
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

  // Image modal close handler - only closes image, not ticket
  const handleImageModalClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setSelectedImage(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-lg flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 p-1 rounded-full hover:bg-blue-400 transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4 text-blue-100">
            <p className="text-sm">
              Ticket #{ticket.id}
            </p>
            <p className="text-sm">
              Created: {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Ticket Details */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Ticket Title */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Ticket Title</h3>
                <div className="text-gray-700 text-sm bg-white p-3 rounded-lg border border-gray-200">
                  {ticket.subject}
                </div>
              </div>

              {/* Status Badges - Side by Side */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 text-xs rounded-full border capitalize ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className={`px-3 py-1 text-xs rounded-full border capitalize ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className={`px-3 py-1 text-xs rounded-full border capitalize ${getCategoryColor(ticket.category)}`}>
                  {ticket.category}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Description</h3>
                <div className="text-gray-700 text-sm bg-white p-4 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
                  {ticket.description}
                </div>
              </div>

              {/* Attachments */}
              {ticket.attachment && ticket.attachment.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Attachments</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg p-3">
                    {ticket.attachment.map((item, index) => (
                      <div key={index} className="flex-shrink-0">
                        <Image 
                          src={item} 
                          height={120} 
                          width={120} 
                          alt={`Attachment ${index + 1}`}
                          className="rounded-lg border border-gray-300 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent ticket modal from closing
                            setSelectedImage(item);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Chat */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {loadingMessages ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-500">Loading messages...</span>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-32 text-center">
                  <div className="text-gray-500 text-lg">No messages yet</div>
                  <div className="text-gray-400 text-sm mt-1">Start the conversation below!</div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => {
                    const isFromUser = message.direction === 'user_to_admin';
                    const isFromAdmin = message.direction === 'admin_to_user';
                    const isCurrentUser = message.senderId === user?.id;
                    const showDate = index === 0 || 
                      formatDate(messages[index - 1].createdAt) !== formatDate(message.createdAt);

                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="bg-white text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                        )}
                        
                        <div className={`flex ${(isAdmin && isFromAdmin) || (!isAdmin && isFromUser) ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
                            (isAdmin && isFromAdmin) || (!isAdmin && isFromUser)
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}>
                            <div className="text-sm break-words leading-relaxed">
                              {message.message}
                            </div>
                            <div className={`text-xs mt-2 ${
                              (isAdmin && isFromAdmin) || (!isAdmin && isFromUser) ? 'text-blue-100' : 'text-gray-500'
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
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSubmitting}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 self-end transition-colors duration-200 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send</span>
                    </>
                  )}
                </button>
              </div>
              {error && (
                <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal - Fixed to prevent ticket closure */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[60]"
          onClick={handleImageModalClose}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on content
          >
            <button
              onClick={handleImageModalClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <Image
              src={selectedImage}
              alt="Full size attachment"
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketModal;
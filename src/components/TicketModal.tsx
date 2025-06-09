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
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
//         <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
//           <X />
//         </button>
//         <h2 className="text-xl font-bold mb-4">{ticket.title}</h2>
//         {/* <p className="text-sm text-gray-600 mb-2"><strong>ID:</strong> {ticket.id}</p> */}
//         <p className="text-sm text-gray-600 mb-2"><strong>Category:</strong> {ticket.category}</p>
//         <p className="text-sm text-gray-600 mb-2"><strong>Priority:</strong> {ticket.priority}</p>
//         <p className="text-sm text-gray-600 mb-2"><strong>Status:</strong> {ticket.status}</p>
//         <p className="text-sm text-gray-600 mb-2"><strong>Date:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
//         <p className="mt-4 text-gray-800">{ticket.description}</p>
//       </div>
//     </div>
//   );
// };

// export default TicketModal;
// components/TicketModal.tsx
'use client';
import React from 'react';
import { X } from 'lucide-react';

interface TicketType {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
}

interface TicketModalProps {
  ticket: TicketType;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{ticket.title}</h2>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full hover:bg-blue-400 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm opacity-90 mt-1">
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Meta information */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</p>
              <p className="text-sm font-medium mt-1">{ticket.category}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</p>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full mt-1 inline-block ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</p>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full mt-1 inline-block ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700 whitespace-pre-line">{ticket.description}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
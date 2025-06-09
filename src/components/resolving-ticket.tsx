// // // components/ResolvingTicket.tsx
// // 'use client';

// // import React, { useState } from 'react';

// // interface Ticket {
// //   id: string;
// //   title: string;
// //   description: string;
// //   status: string;
// //   priority: string;
// //   category: string;
// // }

// // interface Props {
// //   ticket: Ticket;
// //   onClose: () => void;
// //   onResolve?: (message: string) => void;
// // }

// // const ResolvingTicket: React.FC<Props> = ({ ticket, onClose, onResolve }) => {
// //   const [resolutionMessage, setResolutionMessage] = useState('');
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const getStatusColor = (status: string) => {
// //     switch (status.toLowerCase()) {
// //       case 'open':
// //       case 'new':
// //         return 'bg-blue-100 text-blue-800 border-blue-300';
// //       case 'in progress':
// //       case 'working':
// //         return 'bg-yellow-100 text-yellow-800 border-yellow-300';
// //       case 'resolved':
// //       case 'closed':
// //         return 'bg-green-100 text-green-800 border-green-300';
// //       case 'pending':
// //         return 'bg-orange-100 text-orange-800 border-orange-300';
// //       default:
// //         return 'bg-gray-100 text-gray-800 border-gray-300';
// //     }
// //   };

// //   const getPriorityColor = (priority: string) => {
// //     switch (priority.toLowerCase()) {
// //       case 'high':
// //       case 'urgent':
// //         return 'bg-red-100 text-red-800 border-red-300';
// //       case 'medium':
// //         return 'bg-yellow-100 text-yellow-800 border-yellow-300';
// //       case 'low':
// //         return 'bg-green-100 text-green-800 border-green-300';
// //       default:
// //         return 'bg-gray-100 text-gray-800 border-gray-300';
// //     }
// //   };

// //   const getCategoryColor = (category: string) => {
// //     switch (category.toLowerCase()) {
// //       case 'bug':
// //         return 'bg-red-100 text-red-800 border-red-300';
// //       case 'feature':
// //         return 'bg-purple-100 text-purple-800 border-purple-300';
// //       case 'support':
// //         return 'bg-blue-100 text-blue-800 border-blue-300';
// //       case 'enhancement':
// //         return 'bg-indigo-100 text-indigo-800 border-indigo-300';
// //       default:
// //         return 'bg-gray-100 text-gray-800 border-gray-300';
// //     }
// //   };

// //   const handleResolve = async () => {
// //     if (!resolutionMessage.trim()) return;
    
// //     setIsSubmitting(true);
// //     try {
// //       if (onResolve) {
// //         await onResolve(resolutionMessage);
// //       }
// //       onClose();
// //     } catch (error) {
// //       console.error('Error resolving ticket:', error);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div
// //       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
// //       onClick={onClose}
// //     >
// //       <div
// //         className="bg-white rounded-lg shadow-lg max-w-md w-full relative"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* Header */}
// //         <div className="p-6 border-b border-gray-200">
// //           <button
// //             onClick={onClose}
// //             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
// //           >
// //             ×
// //           </button>
// //           <h2 className="text-xl font-semibold text-gray-900 pr-8">
// //             {ticket.title}
// //           </h2>
// //           <p className="text-sm text-gray-600 mt-1">
// //             Ticket #{ticket.id}
// //           </p>
// //         </div>

// //         {/* Content */}
// //         <div className="p-6 space-y-4">
// //           {/* Description */}
// //           <div>
// //             <h3 className="font-medium text-gray-900 mb-2">Description</h3>
// //             <p className="text-gray-700 text-sm">{ticket.description}</p>
// //           </div>

// //           {/* Status and Priority */}
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
// //               <span className={`inline-block px-3 py-1 text-sm rounded border ${getStatusColor(ticket.status)}`}>
// //                 {ticket.status}
// //               </span>
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
// //               <span className={`inline-block px-3 py-1 text-sm rounded border ${getPriorityColor(ticket.priority)}`}>
// //                 {ticket.priority}
// //               </span>
// //             </div>
// //           </div>

// //           {/* Category */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
// //             <span className={`inline-block px-3 py-1 text-sm rounded border capitalize ${getCategoryColor(ticket.category)}`}>
// //               {ticket.category}
// //             </span>
// //           </div>

// //           {/* Resolution Message */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Resolution Message
// //             </label>
// //             <textarea
// //               value={resolutionMessage}
// //               onChange={(e) => setResolutionMessage(e.target.value)}
// //               placeholder="Enter resolution details..."
// //               className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
// //               disabled={isSubmitting}
// //             />
// //             <div className="flex justify-between items-center mt-2">
// //               <span className="text-xs text-gray-500">
// //                 {resolutionMessage.length}/200
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div className="px-6 pb-6 pt-4 border-t border-gray-200">
// //           <div className="flex gap-3">
// //             <button
// //               onClick={onClose}
// //               className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               onClick={handleResolve}
// //               disabled={!resolutionMessage.trim() || isSubmitting}
// //               className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-gray-400"
// //             >
// //               {isSubmitting ? 'Resolving...' : 'Resolve Ticket'}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ResolvingTicket;
// // components/ResolvingTicket.tsx
// 'use client';

// import { useCurrentUser } from '@/hooks/auth';
// import Image from 'next/image';
// import React, { useState } from 'react';

// interface Ticket {
//   id: string;
//   title: string;
//   description: string;
//   status: string;
//   priority: string;
//   category: string;
//   attachment:string[] | null;
// }

// interface Props {
//   ticket: Ticket;
//   onClose: () => void;
//   onResolve?: () => void; // Optional callback after resolution
//   userId: string; // Admin's user ID
// }

// const ResolvingTicket: React.FC<Props> = ({ ticket, onClose, onResolve, userId }) => {
//   const [resolutionMessage, setResolutionMessage] = useState('');
//   const [priority, setPriority] = useState(ticket.priority);
//   const [status, setStatus] = useState(ticket.status);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   console.log(ticket);
//   const user=useCurrentUser();

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'open':
//       case 'new':
//         return 'bg-blue-100 text-blue-800 border-blue-300';
//       case 'in progress':
//       case 'working':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//       case 'resolved':
//       case 'closed':
//         return 'bg-green-100 text-green-800 border-green-300';
//       case 'pending':
//         return 'bg-orange-100 text-orange-800 border-orange-300';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-300';
//     }
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority.toLowerCase()) {
//       case 'high':
//       case 'urgent':
//         return 'bg-red-100 text-red-800 border-red-300';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//       case 'low':
//         return 'bg-green-100 text-green-800 border-green-300';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-300';
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     switch (category.toLowerCase()) {
//       case 'bug':
//         return 'bg-red-100 text-red-800 border-red-300';
//       case 'feature':
//         return 'bg-purple-100 text-purple-800 border-purple-300';
//       case 'support':
//         return 'bg-blue-100 text-blue-800 border-blue-300';
//       case 'enhancement':
//         return 'bg-indigo-100 text-indigo-800 border-indigo-300';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-300';
//     }
//   };

//   const handleResolve = async () => {
//     if (!resolutionMessage.trim()) {
//       setError('Please enter a resolution message');
//       return;
//     }

//     setIsSubmitting(true);
//     setError('');

//     try {
//       const response = await fetch(`/api/tickets?userId=${user?.id}&ticketId=${ticket.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           status: status,
//           priority: priority,
//           message: resolutionMessage
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update ticket');
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         if (onResolve) onResolve();
//         onClose();
//       } else {
//         throw new Error(data.error || 'Failed to update ticket');
//       }
//     } catch (error) {
//       console.error('Error resolving ticket:', error);
//       setError(error instanceof Error ? error.message : 'Failed to update ticket');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-lg shadow-lg max-w-md w-full relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="p-6 border-b border-gray-200">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
//           >
//             ×
//           </button>
//           <h2 className="text-xl font-semibold text-gray-900 pr-8">
//             {ticket.title}
//           </h2>
//           <p className="text-sm text-gray-600 mt-1">
//             Ticket #{ticket.id}
//           </p>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-4">
//           {/* Description */}
//           <div>
//             <h3 className="font-medium text-gray-900 mb-2">Description</h3>
//             <p className="text-gray-700 text-sm">{ticket.description}</p>
//           </div>

//           {/* Status and Priority */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className={`px-3 py-1 text-sm rounded border ${getStatusColor(status)} w-full`}
//                 disabled={isSubmitting}
//               >
//                 <option value="open">Open</option>
//                 <option value="pending">Pending</option>
//                 <option value="resolved">Resolved</option>
//                 <option value="closed">Closed</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//               <select
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//                 className={`px-3 py-1 text-sm rounded border ${getPriorityColor(priority)} w-full`}
//                 disabled={isSubmitting}
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <span className={`inline-block px-3 py-1 text-sm rounded border capitalize ${getCategoryColor(ticket.category)}`}>
//               {ticket.category}
//             </span>
//           </div>
// <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
//   {ticket.attachment && ticket.attachment.map((item)=> 
//   <Image src={item} height={400} width={400} alt='image'></Image>
// )}
// </div>
//           {/* Resolution Message */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Resolution Message
//             </label>
//             <textarea
//               value={resolutionMessage}
//               onChange={(e) => setResolutionMessage(e.target.value)}
//               placeholder="Enter resolution details..."
//               className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
//               disabled={isSubmitting}
//               maxLength={500}
//             />
//             <div className="flex justify-between items-center mt-2">
//               <span className="text-xs text-gray-500">
//                 {resolutionMessage.length}/500
//               </span>
//               {error && <span className="text-xs text-red-500">{error}</span>}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-6 pb-6 pt-4 border-t border-gray-200">
//           <div className="flex gap-3">
//             <button
//               onClick={onClose}
//               disabled={isSubmitting}
//               className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleResolve}
//               disabled={!resolutionMessage.trim() || isSubmitting}
//               className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-gray-400"
//             >
//               {isSubmitting ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResolvingTicket;
// components/ResolvingTicket.tsx
'use client';

import { useCurrentUser } from '@/hooks/auth';
import Image from 'next/image';
import React, { useState } from 'react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  attachment: string[] | null;
}

interface Props {
  ticket: Ticket;
  onClose: () => void;
  onResolve?: () => void; // Optional callback after resolution
  userId: string; // Admin's user ID
}

const ResolvingTicket: React.FC<Props> = ({ ticket, onClose, onResolve, userId }) => {
  const [resolutionMessage, setResolutionMessage] = useState('');
  const [priority, setPriority] = useState(ticket.priority);
  const [status, setStatus] = useState(ticket.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  console.log(ticket);
  const user = useCurrentUser();

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

  const handleResolve = async () => {
    if (!resolutionMessage.trim()) {
      setError('Please enter a resolution message');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/tickets?userId=${user?.id}&ticketId=${ticket.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status,
          priority: priority,
          message: resolutionMessage
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket');
      }

      const data = await response.json();
      
      if (data.success) {
        if (onResolve) onResolve();
        onClose();
      } else {
        throw new Error(data.error || 'Failed to update ticket');
      }
    } catch (error) {
      console.error('Error resolving ticket:', error);
      setError(error instanceof Error ? error.message : 'Failed to update ticket');
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
        className="bg-white rounded-lg shadow-lg max-w-md w-full relative max-h-[90vh] flex flex-col"
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

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Description */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <div className="text-gray-700 text-sm max-h-32 overflow-y-auto bg-gray-50 p-3 rounded border">
                {ticket.description}
              </div>
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-2 gap-4">
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
                  <option value="closed">Closed</option>
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
                        height={200} 
                        width={200} 
                        alt={`Attachment ${index + 1}`}
                        className="rounded border border-gray-300 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedImage(item)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resolution Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolution Message
              </label>
              <textarea
                value={resolutionMessage}
                onChange={(e) => setResolutionMessage(e.target.value)}
                placeholder="Enter resolution details..."
                className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                disabled={isSubmitting}
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {resolutionMessage.length}/500
                </span>
                {error && <span className="text-xs text-red-500">{error}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="px-6 pb-6 pt-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleResolve}
              disabled={!resolutionMessage.trim() || isSubmitting}
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
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
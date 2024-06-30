import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestList = ({ currUser }) => {
    const [requests, setRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('open');
    const [expandedRequestIds, setExpandedRequestIds] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/requests/user_request?user_id=${currUser.id}`
                );
                setRequests(response.data);
            } catch (error) {
                console.error("Error fetching user's requests:", error);
            }
        };

        if (currUser) {
            fetchRequests();
        }
    }, [currUser]);

    if (!currUser) {
        return null;
    }

    const handleRequestAction = async (requestId, action) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/requests/${action}?id=${requestId}`
            );
            setRequests(
                requests.map((request) =>
                    request.id === requestId ? response.data : request
                )
            );
        } catch (error) {
            console.error(
                `Error ${
                    action === 'close' ? 'closing' : 'reopening'
                } request:`,
                error
            );
        }
    };

    const openRequests = requests.filter(
        (request) => request.status !== 'closed'
    );
    const closedRequests = requests.filter(
        (request) => request.status === 'closed'
    );

    const toggleDescription = (requestId) => {
        setExpandedRequestIds((prevState) =>
            prevState.includes(requestId)
                ? prevState.filter((id) => id !== requestId)
                : [...prevState, requestId]
        );
    };

    const renderRequests = (requests) => (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b text-left">Title</th>
                    <th className="py-2 px-4 border-b text-left">
                        Description
                    </th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                    <th className="py-2 px-4 border-b text-left">
                        Proposals Count
                    </th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {requests.map((request) => (
                    <tr key={request.id}>
                        <td className="py-2 px-4 border-b text-left">
                            {request.title}
                        </td>
                        <td className="py-2 px-4 border-b text-left">
                            {expandedRequestIds.includes(request.id)
                                ? request.description
                                : `${request.description.substring(0, 50)}... `}
                            <button
                                onClick={() => toggleDescription(request.id)}
                                className="text-primary underline ml-2"
                            >
                                {expandedRequestIds.includes(request.id)
                                    ? 'See less'
                                    : 'See more'}
                            </button>
                        </td>
                        <td className="py-2 px-4 border-b text-left">
                            {request.status}
                        </td>
                        <td className="py-2 px-4 border-b text-left">
                            {request.proposals_count}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {request.status !== 'closed' ? (
                                <button
                                    onClick={() =>
                                        handleRequestAction(request.id, 'close')
                                    }
                                    className="bg-dark text-white px-4 py-1 rounded font-bold"
                                >
                                    Close this request
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        handleRequestAction(
                                            request.id,
                                            'reopen'
                                        )
                                    }
                                    className="bg-green-500 text-white px-4 py-1 rounded"
                                >
                                    Reopen
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-light py-12">
            <h2 className="text-4xl font-bold text-primary text-center mb-6">
                Your requests
            </h2>
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('open')}
                    className={`px-4 py-2 rounded font-bold ${
                        activeTab === 'open'
                            ? 'bg-primary text-white'
                            : 'bg-gray-400 text-white'
                    }`}
                >
                    Open requests
                </button>
                <button
                    onClick={() => setActiveTab('closed')}
                    className={`px-4 py-2 rounded font-bold ${
                        activeTab === 'closed'
                            ? 'bg-primary text-white'
                            : 'bg-gray-400 text-white'
                    }`}
                >
                    Closed requests
                </button>
            </div>
            <div className="w-full max-w-4xl">
                {activeTab === 'open'
                    ? renderRequests(openRequests)
                    : renderRequests(closedRequests)}
            </div>
        </div>
    );
};

export default RequestList;

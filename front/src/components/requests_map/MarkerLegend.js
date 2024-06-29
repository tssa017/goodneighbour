import React from 'react';

// TODO: Finish
const MarkerLegend = () => {
    return (
        <div className="pb-10">
            <h2 className="text-left text-xl pb-2 font-bold">Legend</h2>
            <div className="flex items-center mb-4 pt-3">
                <div className="w-6 h-6 rounded-full bg-red-500 mr-2"></div>{' '}
                <span>My own request</span>
            </div>
            <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-yellow-300 mr-2"></div>{' '}
                <span>Request I responded to</span>
            </div>
            <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-blue-300 mr-2"></div>{' '}
                <span>Material request</span>
            </div>
            <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-300 mr-2"></div>{' '}
                <span>Task</span>
            </div>
        </div>
    );
};

export default MarkerLegend;

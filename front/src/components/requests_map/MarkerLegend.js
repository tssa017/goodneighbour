import React from 'react';

const MarkerLegend = () => {
    return (
        <div className="pb-10">
            <h2 className="text-left text-xl pt-6 font-bold">Key:</h2>
            <div className="flex items-center justify-start space-x-8 pt-3">
                <div className="flex items-center">
                    <div className="relative w-6 h-6 mr-2">
                        <div className="w-6 h-6 rounded-full bg-red-500"></div>
                        <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-purple-500 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <span>My own request</span>
                </div>
                <div className="flex items-center">
                    <div className="relative w-6 h-6 mr-2">
                        <div className="w-6 h-6 rounded-full bg-red-500"></div>
                        <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <span>Request to respond to</span>
                </div>
                <div className="flex items-center">
                    <div className="relative w-6 h-6 mr-2">
                        <div className="w-6 h-6 rounded-full border-2 border-green-500 bg-red-500"></div>
                        <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <span>I already volunteered</span>
                </div>
            </div>
        </div>
    );
};

export default MarkerLegend;

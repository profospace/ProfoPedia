import React, { useState, useEffect } from 'react';
import AreaPriceTrendAnalysis from '../components/AreaPriceTrendAnalysis';
import AreaDetailPage from '../components/AreaDetailPage';

const AreaWrapper = ({ deeds }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);

    useEffect(() => {


        setData(deeds);
        setLoading(false);


    }, []);

    const handleAreaSelect = (areaName) => {
        setSelectedArea(areaName);
    };

    const handleBack = () => {
        setSelectedArea(null);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading data...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {selectedArea ? (
                <AreaDetailPage
                    data={data}
                    areaName={selectedArea}
                    onBack={handleBack}
                />
            ) : (
                <AreaPriceTrendAnalysis
                    data={data}
                    onAreaSelect={handleAreaSelect}
                />
            )}
        </div>
    );
};

export default AreaWrapper;
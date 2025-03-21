import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-between mt-4">
            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex items-center space-x-1"
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
            </Button>

            <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages || 1}
            </span>

            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= (totalPages || 1)}
                className="flex items-center space-x-1"
            >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default Pagination
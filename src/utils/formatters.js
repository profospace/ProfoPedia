/**
 * Utility functions for formatting values
 */

/**
 * Format a number as currency in Indian Rupee format
 * @param {number} value - The number to format
 * @param {boolean} showSymbol - Whether to include the ₹ symbol
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, showSymbol = true) => {
    if (value === null || value === undefined || isNaN(value)) {
        return showSymbol ? '₹0' : '0';
    }

    // Convert to number if it's a string
    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    // Format with Indian numbering system (lakh, crore)
    const formatter = new Intl.NumberFormat('en-IN', {
        style: showSymbol ? 'currency' : 'decimal',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    return formatter.format(numValue);
};

/**
 * Format a date string or Date object into a readable format
 * @param {string|Date} date - The date to format
 * @param {string} format - Format style: 'short', 'medium', 'long'
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
    if (!date) return '';

    try {
        const dateObj = date instanceof Date ? date : new Date(date);

        // Check if valid date
        if (isNaN(dateObj.getTime())) {
            return '';
        }

        const options = {
            day: 'numeric',
            month: format === 'short' ? 'short' : 'long',
            year: 'numeric'
        };

        // Add time for 'long' format
        if (format === 'long') {
            options.hour = '2-digit';
            options.minute = '2-digit';
        }

        return dateObj.toLocaleDateString('en-IN', options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};

/**
 * Format area with unit
 * @param {number} area - The area value
 * @param {string} unitType - The unit type (e.g., 'sqft', 'acre')
 * @returns {string} Formatted area string
 */
export const formatArea = (area, unitType = '') => {
    if (!area && area !== 0) return '';

    const formattedArea = parseFloat(area).toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    if (!unitType) return formattedArea;

    // Handle different unit types
    switch (unitType.toLowerCase()) {
        case 'sqft':
        case 'sq.ft.':
        case 'square feet':
            return `${formattedArea} sq.ft.`;
        case 'sqm':
        case 'sq.m.':
        case 'square meter':
            return `${formattedArea} sq.m.`;
        case 'acre':
        case 'acres':
            return `${formattedArea} acres`;
        case 'hectare':
        case 'hectares':
            return `${formattedArea} hectares`;
        default:
            return `${formattedArea} ${unitType}`;
    }
};

/**
 * Format a person's name
 * @param {string} name - Person's name
 * @param {string} parentName - Parent's name (optional)
 * @returns {string} Formatted name
 */
export const formatPersonName = (name, parentName) => {
    if (!name) return '';

    if (parentName) {
        return `${name} (S/O ${parentName})`;
    }

    return name;
};

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value)) {
        return '0%';
    }

    return `${parseFloat(value).toFixed(decimals)}%`;
};

/**
 * Format document number with year
 * @param {string} docNum - Document number
 * @param {string} year - Year
 * @returns {string} Formatted document number
 */
export const formatDocumentNumber = (docNum, year) => {
    if (!docNum) return '';
    if (!year) return docNum;

    return `${docNum}/${year}`;
};
import React, { useState, useEffect } from 'react';
import { Eye, Trash2, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecentDeedsTable = ({ data = [] }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortField, setSortField] = useState('registrationDateParsed');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedRows, setSelectedRows] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    let result = [...data];

    // Sort data
    result.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle date comparison for registration date
      if (sortField === 'registrationDateParsed') {
        aValue = aValue ? new Date(aValue) : new Date(0);
        bValue = bValue ? new Date(bValue) : new Date(0);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(result);
  }, [data, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleViewDetails = (id) => {
    // This would normally use router navigation
    // console.log(`Navigate to /deeds/${id}`);
    navigate(`/deeds/${id}`)
    // Example: history.push(`/deeds/${id}`);
    // or with React Router: navigate(`/deeds/${id}`);
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get first party and second party names
  const getPartyNames = (deed) => {
    const firstPartyName = deed.firstParty && deed.firstParty.length > 0 ? deed.firstParty[0].name : 'N/A';
    const secondPartyName = deed.secondParty && deed.secondParty.length > 0 ? deed.secondParty[0].name : 'N/A';

    return (
      <div>
        <div>{firstPartyName}</div>
        <div className="text-gray-500">{secondPartyName}</div>
      </div>
    );
  };

  return (
    <div className="overflow-auto ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-10 px-3 py-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                onChange={() => { }}
              />
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Doc #
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Parties
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Value
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
              onClick={() => handleSort('registrationDateParsed')}
            >
              <div className="flex items-center">
                Date
                <ArrowDown size={14} className={`ml-1 transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              District
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((deed) => (
            <tr key={deed._id} className="hover:bg-gray-50">
              <td className="px-3 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedRows.includes(deed._id)}
                  onChange={() => handleRowSelect(deed._id)}
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{deed.documentNumber}</div>
                <div className="text-sm text-gray-500">{deed.year}</div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{deed.deedType}</div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                {getPartyNames(deed)}
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {formatCurrency(deed.transactionValue)}
                </div>
                <div className="text-sm text-gray-500">
                  Mkt: {formatCurrency(deed.marketValue)}
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {deed.registrationDate}
                </div>
                <div className="text-sm text-gray-500">
                  Exe: {deed.executionDate || 'N/A'}
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{deed.district}</div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewDetails(deed._id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Eye size={18} />
                  </button>
                  {/* <button
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentDeedsTable;
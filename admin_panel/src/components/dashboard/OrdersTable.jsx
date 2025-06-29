import React, { useState, useMemo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAffiliate } from '../../contexts/AffiliateContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Package,
    Filter,
    Download,
    Eye,
    Calendar,
    User,
    ShoppingBag,
    IndianRupee,
    ArrowUpDown
} from 'lucide-react';

const OrdersTable = () => {
    const { theme } = useTheme();
    const { orders, orderStatuses } = useAffiliate();
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    // Filter and sort orders
    const processedOrders = useMemo(() => {
        let filtered = orders;

        // Apply search filter
        if (searchTerm.trim()) {
            filtered = filtered.filter(order => {
                const statusText = orderStatuses.get(order.id) ? 'matured' : 'unmatured';
                const commission = Math.round(order.sale * 0.05).toString();

                return (
                    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.sale.toString().includes(searchTerm) ||
                    commission.includes(searchTerm) ||
                    statusText.includes(searchTerm.toLowerCase())
                );
            });
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => {
                const isMatured = orderStatuses.get(order.id);
                return statusFilter === 'matured' ? isMatured : !isMatured;
            });
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'customer':
                    aValue = a.customer;
                    bValue = b.customer;
                    break;
                case 'product':
                    aValue = a.product;
                    bValue = b.product;
                    break;
                case 'sale':
                    aValue = a.sale;
                    bValue = b.sale;
                    break;
                case 'commission':
                    aValue = Math.round(a.sale * 0.05);
                    bValue = Math.round(b.sale * 0.05);
                    break;
                default:
                    aValue = a.id;
                    bValue = b.id;
            }

            if (typeof aValue === 'string') {
                return sortOrder === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }
        });

        return filtered;
    }, [orders, orderStatuses, searchTerm, statusFilter, sortBy, sortOrder]);

    // Paginate filtered orders
    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return processedOrders.slice(startIndex, startIndex + rowsPerPage);
    }, [processedOrders, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(processedOrders.length / rowsPerPage);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const getStatusBadge = (isMatured) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";

        if (isMatured) {
            return (
                <span
                    className={baseClasses}
                    style={{
                        backgroundColor: theme.colors.successLight,
                        color: theme.colors.success,
                        border: `1px solid ${theme.colors.success}30`
                    }}
                >
                    Matured
                </span>
            );
        } else {
            return (
                <span
                    className={baseClasses}
                    style={{
                        backgroundColor: theme.colors.warningLight,
                        color: theme.colors.warning,
                        border: `1px solid ${theme.colors.warning}30`
                    }}
                >
                    Pending
                </span>
            );
        }
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <Card shadow="lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: theme.colors.primaryLight }}
                    >
                        <Package size={20} style={{ color: theme.colors.primary }} />
                    </div>
                    <div>
                        <h2
                            className="text-xl font-bold"
                            style={{ color: theme.colors.gray900 }}
                        >
                            Referred Orders
                        </h2>
                        <p
                            className="text-sm"
                            style={{ color: theme.colors.gray600 }}
                        >
                            {processedOrders.length} orders found
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm" icon={<Download size={16} />}>
                        Export
                    </Button>
                    <Button variant="outline" size="sm" icon={<Filter size={16} />}>
                        Filter
                    </Button>
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-2">
                    <Input
                        placeholder="Search orders, customers, products..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        leftIcon={<Search size={16} />}
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="px-4 py-2.5 border rounded-xl text-sm font-medium"
                    style={{
                        borderColor: theme.colors.gray300,
                        backgroundColor: theme.colors.white,
                        color: theme.colors.gray900,
                    }}
                >
                    <option value="all">All Status</option>
                    <option value="matured">Matured</option>
                    <option value="pending">Pending</option>
                </select>

                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="px-4 py-2.5 border rounded-xl text-sm font-medium"
                    style={{
                        borderColor: theme.colors.gray300,
                        backgroundColor: theme.colors.white,
                        color: theme.colors.gray900,
                    }}
                >
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr style={{ backgroundColor: theme.colors.gray50 }}>
                            <th
                                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                                style={{ color: theme.colors.gray700 }}
                                onClick={() => handleSort('id')}
                            >
                                <div className="flex items-center gap-2">
                                    Order ID
                                    <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                                style={{ color: theme.colors.gray700 }}
                                onClick={() => handleSort('customer')}
                            >
                                <div className="flex items-center gap-2">
                                    <User size={14} />
                                    Customer
                                    <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                                style={{ color: theme.colors.gray700 }}
                                onClick={() => handleSort('product')}
                            >
                                <div className="flex items-center gap-2">
                                    <ShoppingBag size={14} />
                                    Product
                                    <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                                style={{ color: theme.colors.gray700 }}
                                onClick={() => handleSort('sale')}
                            >
                                <div className="flex items-center gap-2">
                                    <IndianRupee size={14} />
                                    Sale Amount
                                    <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                                style={{ color: theme.colors.gray700 }}
                                onClick={() => handleSort('commission')}
                            >
                                <div className="flex items-center gap-2">
                                    Commission
                                    <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 text-left font-semibold"
                                style={{ color: theme.colors.gray700 }}
                            >
                                Status
                            </th>
                            <th
                                className="px-6 py-4 text-left font-semibold"
                                style={{ color: theme.colors.gray700 }}
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order, index) => {
                            const commission = Math.round(order.sale * 0.05);
                            const isMatured = orderStatuses.get(order.id);

                            return (
                                <tr
                                    key={order.id}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                    style={{ borderColor: theme.colors.gray200 }}
                                >
                                    <td className="px-6 py-4">
                                        <span
                                            className="font-mono text-sm font-semibold"
                                            style={{ color: theme.colors.primary }}
                                        >
                                            {order.id}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                                                style={{
                                                    backgroundColor: theme.colors.primaryLight,
                                                    color: theme.colors.primary
                                                }}
                                            >
                                                {order.customer.charAt(0)}
                                            </div>
                                            <span
                                                className="font-medium"
                                                style={{ color: theme.colors.gray900 }}
                                            >
                                                {order.customer}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span style={{ color: theme.colors.gray900 }}>
                                            {order.product}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="font-semibold"
                                            style={{ color: theme.colors.gray900 }}
                                        >
                                            ₹{order.sale.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="font-semibold"
                                            style={{ color: theme.colors.success }}
                                        >
                                            ₹{commission.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(isMatured)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button
                                            variant="outline"
                                            size="xs"
                                            icon={<Eye size={14} />}
                                        >
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t" style={{ borderColor: theme.colors.gray200 }}>
                <div className="text-sm" style={{ color: theme.colors.gray600 }}>
                    Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, processedOrders.length)} of {processedOrders.length} orders
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange('prev')}
                        disabled={currentPage === 1}
                        icon={<ChevronLeft size={16} />}
                    >
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = i + 1;
                            const isActive = pageNum === currentPage;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
                                    style={{
                                        backgroundColor: isActive ? theme.colors.primary : 'transparent',
                                        color: isActive ? theme.colors.white : theme.colors.gray600,
                                        border: `1px solid ${isActive ? theme.colors.primary : theme.colors.gray300}`
                                    }}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange('next')}
                        disabled={currentPage === totalPages}
                        icon={<ChevronRight size={16} />}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default OrdersTable;
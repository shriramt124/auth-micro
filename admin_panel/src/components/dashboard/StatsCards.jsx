import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAffiliate } from '../../contexts/AffiliateContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import {
    TrendingUp,
    ShoppingCart,
    DollarSign,
    Percent,
    Wallet,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const StatsCards = ({ onReleaseClick }) => {
    const { theme } = useTheme();
    const { stats } = useAffiliate();

    const statsData = [
        {
            title: 'Total Clicks',
            value: stats.totalClicks.toLocaleString(),
            icon: TrendingUp,
            color: theme.colors.info,
            bgColor: theme.colors.infoLight,
            change: '+12.5%',
            changeType: 'positive',
            description: 'vs last month'
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders.toString(),
            icon: ShoppingCart,
            color: theme.colors.warning,
            bgColor: theme.colors.warningLight,
            change: '+8.2%',
            changeType: 'positive',
            description: 'vs last month'
        },
        {
            title: 'Total Sales',
            value: `₹${stats.totalSales.toLocaleString()}`,
            icon: DollarSign,
            color: theme.colors.success,
            bgColor: theme.colors.successLight,
            change: '+15.3%',
            changeType: 'positive',
            description: 'vs last month'
        },
        {
            title: 'Commission (5%)',
            value: `₹${stats.commission.toLocaleString()}`,
            icon: Percent,
            color: theme.colors.primary,
            bgColor: theme.colors.primaryLight,
            change: '+18.7%',
            changeType: 'positive',
            description: 'vs last month'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {statsData.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <Card key={index} hover shadow="lg" className="relative overflow-hidden">
                        {/* Background Pattern */}
                        <div
                            className="absolute top-0 right-0 w-20 h-20 opacity-10"
                            style={{
                                background: `radial-gradient(circle, ${stat.color} 0%, transparent 70%)`,
                            }}
                        />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                style={{ backgroundColor: stat.bgColor }}
                            >
                                <IconComponent size={24} style={{ color: stat.color }} />
                            </div>

                            {/* Title */}
                            <h3
                                className="text-sm font-semibold mb-2 text-gray-600"
                                style={{ color: theme.colors.gray600 }}
                            >
                                {stat.title}
                            </h3>

                            {/* Value */}
                            <p
                                className="text-2xl font-bold mb-2"
                                style={{ color: theme.colors.gray900 }}
                            >
                                {stat.value}
                            </p>

                            {/* Change Indicator */}
                            <div className="flex items-center gap-1">
                                {stat.changeType === 'positive' ? (
                                    <ArrowUpRight size={16} style={{ color: theme.colors.success }} />
                                ) : (
                                    <ArrowDownRight size={16} style={{ color: theme.colors.danger }} />
                                )}
                                <span
                                    className="text-sm font-medium"
                                    style={{
                                        color: stat.changeType === 'positive' ? theme.colors.success : theme.colors.danger
                                    }}
                                >
                                    {stat.change}
                                </span>
                                <span
                                    className="text-sm"
                                    style={{ color: theme.colors.gray500 }}
                                >
                                    {stat.description}
                                </span>
                            </div>
                        </div>
                    </Card>
                );
            })}

            {/* Matured Commission Card */}
            <Card hover shadow="lg" className="relative overflow-hidden">
                {/* Background Pattern */}
                <div
                    className="absolute top-0 right-0 w-20 h-20 opacity-10"
                    style={{
                        background: `radial-gradient(circle, ${theme.colors.success} 0%, transparent 70%)`,
                    }}
                />

                <div className="relative z-10">
                    {/* Icon */}
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: theme.colors.successLight }}
                    >
                        <Wallet size={24} style={{ color: theme.colors.success }} />
                    </div>

                    {/* Title */}
                    <h3
                        className="text-sm font-semibold mb-2"
                        style={{ color: theme.colors.gray600 }}
                    >
                        Matured Commission
                    </h3>

                    {/* Value */}
                    <p
                        className="text-2xl font-bold mb-4"
                        style={{ color: theme.colors.gray900 }}
                    >
                        ₹{stats.maturedCommission.toLocaleString()}
                    </p>

                    {/* Release Button */}
                    <Button
                        variant="success"
                        size="sm"
                        onClick={onReleaseClick}
                        disabled={stats.maturedCommission === 0}
                        fullWidth
                        className="font-semibold"
                    >
                        Release Amount
                    </Button>

                    {stats.maturedCommission === 0 && (
                        <p
                            className="text-xs mt-2 text-center"
                            style={{ color: theme.colors.gray500 }}
                        >
                            No amount to release
                        </p>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default StatsCards;
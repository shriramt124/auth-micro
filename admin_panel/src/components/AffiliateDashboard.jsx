import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import StatsCards from './dashboard/StatsCards';
import AffiliateGenerator from './dashboard/AffiliateGenerator';
import OrdersTable from './dashboard/OrdersTable';
import ReleaseModal from './dashboard/ReleaseModal';

const AffiliateDashboard = () => {
    const { theme } = useTheme();
    const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);

    const containerStyles = {
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.backgroundSecondary} 100%)`,
        padding: '2rem 1rem',
        fontFamily: theme.typography.fontFamily.sans.join(', '),
    };

    return (
        <div style={containerStyles}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="mb-4">
                        <h1
                            className="text-4xl md:text-5xl font-bold mb-4"
                            style={{
                                color: theme.colors.gray900,
                                fontFamily: theme.typography.fontFamily.sans.join(', '),
                                fontWeight: theme.typography.fontWeight.bold
                            }}
                        >
                            BonziCart Affiliate Dashboard
                        </h1>
                        <div
                            className="w-24 h-1 mx-auto rounded-full"
                            style={{ backgroundColor: theme.colors.primary }}
                        />
                    </div>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: theme.colors.gray600 }}
                    >
                        Track your performance, generate affiliate links, and manage your earnings with our comprehensive dashboard
                    </p>
                </div>

                {/* Stats Cards */}
                <StatsCards onReleaseClick={() => setIsReleaseModalOpen(true)} />

                {/* Affiliate Link Generator */}
                <AffiliateGenerator />

                {/* Orders Table */}
                <OrdersTable />

                {/* Release Modal */}
                <ReleaseModal
                    isOpen={isReleaseModalOpen}
                    onClose={() => setIsReleaseModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default AffiliateDashboard;
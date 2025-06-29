import React, { createContext, useContext, useState, useEffect } from 'react';

const AffiliateContext = createContext();

// Mock data - in real app, this would come from API
const mockOrders = [
    { id: '#ORD1011', customer: 'Ajay M.', product: 'USB Cable', sale: 299 },
    { id: '#ORD1012', customer: 'Divya K.', product: 'Desk Organizer', sale: 899 },
    { id: '#ORD1013', customer: 'Imran R.', product: 'Portable Fan', sale: 1299 },
    { id: '#ORD1014', customer: 'Kavita T.', product: 'LED Bulb', sale: 499 },
    { id: '#ORD1015', customer: 'Manoj N.', product: 'Phone Holder', sale: 649 },
    { id: '#ORD1023', customer: 'Neha S.', product: 'Power Bank 5000mAh', sale: 2999 },
    { id: '#ORD1024', customer: 'Ravi P.', product: 'Wireless Charger', sale: 1999 },
    { id: '#ORD1025', customer: 'Alok T.', product: 'Bluetooth Speaker', sale: 3499 },
    { id: '#ORD1026', customer: 'Zara Q.', product: 'LED Night Lamp', sale: 999 },
    { id: '#ORD1027', customer: 'Sita M.', product: 'Mini Torch Light', sale: 649 }
];

export const AffiliateProvider = ({ children }) => {
    const [orders, setOrders] = useState(mockOrders);
    const [orderStatuses, setOrderStatuses] = useState(new Map());
    const [stats, setStats] = useState({
        totalClicks: 1284,
        totalOrders: 5,
        totalSales: 10145,
        commission: 507,
        maturedCommission: 0
    });

    // Initialize order statuses
    useEffect(() => {
        const statusMap = new Map();
        orders.forEach(order => {
            statusMap.set(order.id, Math.random() > 0.5);
        });
        setOrderStatuses(statusMap);
    }, [orders]);

    // Calculate matured commission
    useEffect(() => {
        let maturedTotal = 0;
        orders.forEach(order => {
            if (orderStatuses.get(order.id)) {
                maturedTotal += Math.round(order.sale * 0.05);
            }
        });
        setStats(prev => ({ ...prev, maturedCommission: maturedTotal }));
    }, [orders, orderStatuses]);

    const generateAffiliateLink = (originalLink) => {
        if (!originalLink) return '';

        const allowedDomains = ['bonzicart.com', 'bonzikart.page.link'];
        try {
            const url = new URL(originalLink);
            const isAllowed = allowedDomains.some(domain => url.hostname.endsWith(domain));
            if (!isAllowed) {
                throw new Error('Invalid domain');
            }
            return originalLink.includes('?')
                ? `${originalLink}&ref=amit123`
                : `${originalLink}?ref=amit123`;
        } catch {
            throw new Error('Invalid URL format');
        }
    };

    const releaseCommission = (amount) => {
        setStats(prev => ({ ...prev, maturedCommission: 0 }));
        // In real app, this would make API call
        return Promise.resolve();
    };

    const value = {
        orders,
        orderStatuses,
        stats,
        generateAffiliateLink,
        releaseCommission,
    };

    return (
        <AffiliateContext.Provider value={value}>
            {children}
        </AffiliateContext.Provider>
    );
};

export const useAffiliate = () => {
    const context = useContext(AffiliateContext);
    if (!context) {
        throw new Error('useAffiliate must be used within an AffiliateProvider');
    }
    return context;
};

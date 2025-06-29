import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAffiliate } from '../../contexts/AffiliateContext';
import { useToast } from '../ui/Toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { DollarSign, AlertCircle } from 'lucide-react';

const ReleaseModal = ({ isOpen, onClose }) => {
    const { theme } = useTheme();
    const { stats, releaseCommission } = useAffiliate();
    const { addToast } = useToast();

    const handleConfirmRelease = async () => {
        try {
            await releaseCommission(stats.maturedCommission);
            addToast('Commission released successfully!', 'success', {
                title: 'Release Successful',
                duration: 4000
            });
            onClose();
        } catch (error) {
            addToast('Failed to release commission. Please try again.', 'error', {
                title: 'Release Failed',
                duration: 5000
            });
        }
    };

    const footer = (
        <>
            <Button variant="secondary" onClick={onClose}>
                Cancel
            </Button>
            <Button variant="success" onClick={handleConfirmRelease}>
                Confirm Release
            </Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Release Commission"
            footer={footer}
            size="md"
        >
            <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.colors.successLight }}
                    >
                        <DollarSign size={32} style={{ color: theme.colors.success }} />
                    </div>
                </div>

                <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: theme.colors.gray900 }}
                >
                    Release Matured Commission
                </h3>

                <p
                    className="mb-6"
                    style={{ color: theme.colors.gray600 }}
                >
                    You are about to release the following matured commission amount:
                </p>

                <div
                    className="text-4xl font-bold mb-6 p-4 rounded-xl"
                    style={{
                        color: theme.colors.success,
                        backgroundColor: theme.colors.successLight
                    }}
                >
                    ₹{stats.maturedCommission.toLocaleString()}
                </div>

                <div
                    className="flex items-start gap-3 p-4 rounded-xl text-left"
                    style={{ backgroundColor: theme.colors.warningLight }}
                >
                    <AlertCircle size={20} style={{ color: theme.colors.warning, flexShrink: 0, marginTop: '2px' }} />
                    <div>
                        <p
                            className="text-sm font-medium mb-1"
                            style={{ color: theme.colors.warning }}
                        >
                            Important Notice
                        </p>
                        <p
                            className="text-sm"
                            style={{ color: theme.colors.gray700 }}
                        >
                            This action cannot be undone. The amount will be processed for payout within 3-5 business days.
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ReleaseModal;
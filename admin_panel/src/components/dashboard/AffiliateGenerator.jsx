import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAffiliate } from '../../contexts/AffiliateContext';
import { useToast } from '../ui/Toast';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Link2, Copy, ExternalLink, CheckCircle } from 'lucide-react';

const AffiliateGenerator = () => {
    const { theme } = useTheme();
    const { generateAffiliateLink } = useAffiliate();
    const { addToast } = useToast();
    const [inputLink, setInputLink] = useState('');
    const [affiliateLink, setAffiliateLink] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerateLink = async () => {
        if (!inputLink.trim()) {
            addToast('Please enter a product link first.', 'error', {
                title: 'Missing Link'
            });
            return;
        }

        setIsGenerating(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const generatedLink = generateAffiliateLink(inputLink);
            setAffiliateLink(generatedLink);

            addToast('Affiliate link generated successfully!', 'success', {
                title: 'Success'
            });
        } catch (error) {
            addToast(error.message, 'error', {
                title: 'Generation Failed'
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopyLink = async () => {
        if (!affiliateLink) {
            addToast('Generate a link first to copy it.', 'error', {
                title: 'No Link Available'
            });
            return;
        }

        try {
            await navigator.clipboard.writeText(affiliateLink);
            setIsCopied(true);

            addToast('Affiliate link copied to clipboard!', 'success', {
                title: 'Copied Successfully'
            });

            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            addToast('Failed to copy link. Please try again.', 'error', {
                title: 'Copy Failed'
            });
        }
    };

    const handleOpenLink = () => {
        if (affiliateLink) {
            window.open(affiliateLink, '_blank');
        }
    };

    return (
        <Card shadow="lg" className="mb-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.primaryLight }}
                >
                    <Link2 size={20} style={{ color: theme.colors.primary }} />
                </div>
                <div>
                    <h2
                        className="text-xl font-bold"
                        style={{ color: theme.colors.gray900 }}
                    >
                        Generate Affiliate Link
                    </h2>
                    <p
                        className="text-sm"
                        style={{ color: theme.colors.gray600 }}
                    >
                        Convert any BonziCart product link into your affiliate link
                    </p>
                </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-3">
                        <Input
                            placeholder="https://bonzicart.com/product/example-product"
                            value={inputLink}
                            onChange={(e) => setInputLink(e.target.value)}
                            leftIcon={<Link2 size={16} />}
                            helperText="Paste any BonziCart product link here"
                        />
                    </div>
                    <Button
                        onClick={handleGenerateLink}
                        loading={isGenerating}
                        disabled={!inputLink.trim()}
                        size="lg"
                        className="h-full"
                    >
                        Generate Link
                    </Button>
                </div>

                {/* Generated Link Section */}
                {affiliateLink && (
                    <div className="mt-6 p-4 rounded-xl border-2 border-dashed" style={{ borderColor: theme.colors.gray300, backgroundColor: theme.colors.gray50 }}>
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle size={16} style={{ color: theme.colors.success }} />
                            <span className="text-sm font-semibold" style={{ color: theme.colors.success }}>
                                Affiliate Link Generated
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
                            <div className="lg:col-span-4">
                                <Input
                                    value={affiliateLink}
                                    readOnly
                                    leftIcon={<Link2 size={16} />}
                                    className="bg-white"
                                />
                            </div>
                            <Button
                                onClick={handleCopyLink}
                                variant="secondary"
                                icon={isCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                                className={isCopied ? 'bg-green-50 border-green-200 text-green-700' : ''}
                            >
                                {isCopied ? 'Copied!' : 'Copy'}
                            </Button>
                            <Button
                                onClick={handleOpenLink}
                                variant="outline"
                                icon={<ExternalLink size={16} />}
                            >
                                Preview
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: theme.colors.primaryLight }}>
                <h4 className="font-semibold mb-2" style={{ color: theme.colors.primary }}>
                    How it works:
                </h4>
                <ul className="text-sm space-y-1" style={{ color: theme.colors.gray700 }}>
                    <li>• Paste any BonziCart product link above</li>
                    <li>• We'll add your unique affiliate ID to track referrals</li>
                    <li>• Share the generated link to earn 5% commission on sales</li>
                    <li>• Track your earnings in real-time on this dashboard</li>
                </ul>
            </div>
        </Card>
    );
};

export default AffiliateGenerator;
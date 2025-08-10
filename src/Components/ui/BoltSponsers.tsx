import type { Sponsor } from '@/Constants/Sponsers/PastSponsors';
import React, { useState } from 'react';

interface BoltSponsersCardProps {
    sponsor: Sponsor;
}

const BoltSponsers: React.FC<BoltSponsersCardProps> = ({ sponsor }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div
            className={`
                relative bg-gray-900 border border-red-900/30 rounded-lg p-6 
                transition-all duration-300 ease-in-out
                hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20
                hover:scale-105 hover:bg-gray-800
                ? 'cursor-pointer' : 'cursor-default'}
                group overflow-hidden
            `}>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

            {/* Loading state */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div
                            className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                            style={{ animationDelay: '0.2s' }}></div>
                        <div
                            className="w-2 h-2 bg-red-300 rounded-full animate-pulse"
                            style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <div className="flex flex-col items-center justify-center h-24 text-red-400">
                    <div className="text-2xl mb-2">⚠️</div>
                    <div className="text-sm font-medium text-center">
                        {sponsor.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        Logo unavailable
                    </div>
                </div>
            )}

            {/* Logo */}
            {!hasError && (
                <div className="relative z-10 flex items-center justify-center h-24">
                    <img
                        src={sponsor.src}
                        alt={`${sponsor.name} logo`}
                        className={`
              max-h-full max-w-full object-contain
              transition-all duration-300
              group-hover:brightness-110
              ${isLoading ? 'opacity-0' : 'opacity-100'}
            `}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        loading="lazy"
                    />
                </div>
            )}

            {/* Sponsor name */}
            <div className="relative z-10 mt-4 text-center">
                <h3 className="text-sm font-semibold text-gray-300 group-hover:text-red-400 transition-colors duration-300">
                    {sponsor.name}
                </h3>
            </div>

            {/* Click indicator */}
            {sponsor.src && (
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
            )}
        </div>
    );
};

export default BoltSponsers;

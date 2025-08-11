interface SponsorBubbleProps {
    data: {
        src: string;
        name: string;
        alt?: string;
    };
    className?: string;
    setClick?: (name: string) => void;
}

const SponsorBubble: React.FC<SponsorBubbleProps> = ({
    data,
    className,
    setClick,
}) => {
    const handleClick = () => {
        if (setClick) {
            setClick(data.name);
        }
    };

    return (
        <div
            className={`childComponent ${className} cursor-pointer group relative w-full h-full`}
            onClick={handleClick}
            title={data.name}>
            <div className="w-full h-full rounded-full flex items-center justify-center p-1">
                <img
                    src={data.src}
                    alt={data.alt || data.name}
                    className="w-full h-full object-contain rounded-full"
                    draggable={false}
                />

                {/* Hover overlay with sponsor name - simplified */}
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white text-xs font-medium text-center px-2 truncate">
                        {data.name}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SponsorBubble;

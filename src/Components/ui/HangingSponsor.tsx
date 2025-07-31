interface HangingSponsorProps {
  imageURL: string | null;
  name?: string;
  showName?: boolean;
}

const HangingSponsor = ({ imageURL, name, showName = false }: HangingSponsorProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-36 aspect-square bg-white/10 border-white/20 border-[3px] rounded-full overflow-hidden flex items-center justify-center">
        {imageURL && (
          <img
            src={imageURL}
            alt={name || "Sponsor"}
            className="w-[60%] h-[60%] object-contain"
          />
        )}
      </div>

      {showName && name && (
        <span className="text-white text-xl text-center">{name}</span>
      )}
    </div>
  );
};

export default HangingSponsor;

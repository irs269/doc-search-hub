const LoadingCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border-0 bg-card shadow-md">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="p-5">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 animate-pulse"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gradient-to-r from-muted/80 to-muted/40 rounded-lg w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-muted/60 to-muted/30 rounded w-1/2 animate-pulse" style={{ animationDelay: '100ms' }}></div>
            <div className="h-4 bg-gradient-to-r from-muted/60 to-muted/30 rounded w-2/3 animate-pulse" style={{ animationDelay: '200ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;

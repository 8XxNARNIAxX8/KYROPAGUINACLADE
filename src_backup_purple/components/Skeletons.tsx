export function SkeletonCard() {
  return (
    <div className="bg-[#12121e] border border-[#1e1e2e] rounded-xl p-5 animate-pulse">
      <div className="h-3 w-24 bg-[#1e1e2e] rounded mb-4" />
      <div className="h-7 w-32 bg-[#252538] rounded mb-3" />
      <div className="h-3 w-16 bg-[#1e1e2e] rounded" />
    </div>
  );
}

export function SkeletonBar() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="flex justify-between">
        <div className="h-3 w-24 bg-[#1e1e2e] rounded" />
        <div className="h-3 w-16 bg-[#1e1e2e] rounded" />
      </div>
      <div className="h-2 w-full bg-[#1e1e2e] rounded-full" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3 animate-pulse">
      <div className="h-3 w-20 bg-[#1e1e2e] rounded" />
      <div className="h-3 w-36 bg-[#252538] rounded" />
      <div className="h-3 w-20 bg-[#1e1e2e] rounded ml-auto" />
      <div className="h-3 w-16 bg-[#252538] rounded" />
    </div>
  );
}

export function SkeletonAlert() {
  return (
    <div className="flex items-start gap-3 py-3 animate-pulse">
      <div className="w-2 h-2 rounded-full bg-[#1e1e2e] mt-1.5 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-full bg-[#1e1e2e] rounded" />
        <div className="h-2 w-20 bg-[#1e1e2e] rounded" />
      </div>
    </div>
  );
}

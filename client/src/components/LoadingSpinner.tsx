export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-12 h-12 rounded-full border-2 border-black/10 border-t-[#A8842C] animate-spin" />
    </div>
  );
}

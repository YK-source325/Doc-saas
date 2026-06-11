export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-12 h-12 rounded-full border-2 border-[#C9A84C]/20 border-t-[#C9A84C] animate-spin" />
    </div>
  );
}

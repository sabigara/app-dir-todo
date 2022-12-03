export default function SidebarLoading() {
  return (
    <div className="p-2 border-r">
      <ul className="flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i} className="h-6 animate-pulse rounded-md bg-gray-200" />
        ))}
      </ul>
    </div>
  );
}

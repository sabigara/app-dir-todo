export default function TodoItemLoading() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="h-8 w-[16rem] loader" />
      <div className="loader-rounded h-6 w-[4rem]" />
    </div>
  );
}

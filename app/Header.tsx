import clsx from "clsx";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  return (
    <header
      className={clsx("h-[3rem] border-b flex items-center px-4", className)}
    >
      <Link href="/" className="font-bold text-xl text-purple-600">
        Todo App
      </Link>
    </header>
  );
}

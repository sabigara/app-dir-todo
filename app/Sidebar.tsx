"use client";

import { Todo } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

type Props = {
  todoList: Todo[];
  className?: string;
};

export default function Sidebar({ todoList, className }: Props) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const isActive = (id: number) => Number(segments[1]) === id;
  return (
    <ul className={clsx("border-r p-2 flex flex-col gap-1", className)}>
      {todoList.map((item) => (
        <li key={item.id}>
          <Link
            href={`/todos/${item.id}`}
            className={clsx(
              "hover:bg-slate-100 rounded-md w-full block px-2 py-1",
              isActive(item.id) && "font-semibold text-purple-600 bg-purple-100"
            )}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

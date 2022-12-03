"use client";

import { Todo } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

type Props = {
  todo: Todo;
};

export function SidebarItem({ todo }: Props) {
  const segments = useSelectedLayoutSegments();
  const isActive = Number(segments[1]) === todo.id;

  return (
    <Link
      href={`/todos/${todo.id}`}
      className={clsx(
        "hover:bg-slate-100 rounded-md w-full block px-2 py-1",
        isActive && "font-semibold text-purple-600 bg-purple-100"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {todo.title}
    </Link>
  );
}

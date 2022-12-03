"use client";

import { Todo } from "@prisma/client";
import clsx from "clsx";
import React from "react";
import { SidebarFilterSwitch } from "./SidebarFilterSwitch";
import { SidebarItem } from "./SidebarItem";

type Props = {
  todoList: Todo[];
  className?: string;
};

export default function SidebarInner({ todoList, className }: Props) {
  const [excludeDone, setExcludeDone] = React.useState(false);
  return (
    <div className={clsx("border-r p-2", className)}>
      <SidebarFilterSwitch value={excludeDone} onChange={setExcludeDone} />
      <ul className="flex flex-col gap-1 mt-4">
        {todoList
          .filter((todo) => (excludeDone ? todo.done === false : true))
          .map((todo) => (
            <li key={todo.id}>
              <SidebarItem todo={todo} />
            </li>
          ))}
      </ul>
    </div>
  );
}

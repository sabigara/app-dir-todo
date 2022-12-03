import React from "react";
import { prisma } from "../../lib/db";
import { sleep } from "../../lib/sleep";
import SidebarInner from "./SidebarInner";

async function getData() {
  await sleep(1000);
  return prisma.todo.findMany();
}

type Props = {
  className?: string;
  searchParams?: {
    done?: "true" | "false";
  };
};

export default async function Sidebar({ className }: Props) {
  const todoList = await getData();

  return <SidebarInner todoList={todoList} className={className} />;
}

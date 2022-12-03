import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { prisma } from "../../../../lib/db";
import { sleep } from "../../../../lib/sleep";
import TodoUpdateForm from "./Form";

async function getData(id: number) {
  await sleep(1000);
  const item = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  return item;
}

type Props = {
  params: {
    todoId: string;
  };
};

export default async function TodoItemPage({ params }: Props) {
  const { todoId } = params;
  const todo = await getData(Number(params.todoId));

  if (!todo) notFound();

  const switchStatus = async () => {
    await fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({
        done: !todo.done,
      }),
    });
  };

  return (
    <div className="p-4">
      <TodoUpdateForm todo={todo} />
    </div>
  );
}

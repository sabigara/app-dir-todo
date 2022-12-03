import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { prisma } from "../../../lib/db";
import { sleep } from "../../../lib/sleep";
import TodoDeleteForm from "./TodoDeleteForm";

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

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">{todo.title}</h1>
      <dl className="mt-4">
        <dt className="sr-only">Status</dt>
        <dd className="bg-purple-100 px-3 py-[2px] inline-block rounded-full text-sm text-purple-600 font-semibold">
          {todo.done ? "Done" : "Not done"}
        </dd>
      </dl>
      <div className="flex gap-4 mt-8">
        <Link href={`/todos/${todoId}/edit`} className="btn btn-sm btn-primary">
          Edit
        </Link>
        <TodoDeleteForm todo={todo} />
      </div>
    </div>
  );
}

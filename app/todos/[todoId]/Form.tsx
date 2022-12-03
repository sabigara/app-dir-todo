"use client";

import { Todo } from "@prisma/client";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
  todo: Todo;
};

export default function TodoDeleteForm({ todo }: Props) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  if (!todo) notFound();

  const onSubmit = async () => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });
    router.refresh();
    router.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button className="button-danger" disabled={isSubmitting}>
        {isSubmitting ? "Loading" : "Delete"}
      </button>
    </form>
  );
}

"use client";

import { Todo } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Schema = {
  title: string;
  done: "true" | false;
};

type Props = {
  todo: Todo;
};

export default function TodoUpdateForm({ todo }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Schema>({
    defaultValues: {
      done: todo.done ? "true" : false,
      title: todo.title,
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        done: data.done === "true",
      }),
    });
    router.refresh();
    router.replace(`/todos/${todo.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-start"
    >
      <label className="flex flex-col gap-2">
        <span className="block">What to do?</span>
        <textarea
          className="textarea textarea-bordered"
          {...register("title", {
            required: true,
          })}
        />
      </label>
      <label className="flex gap-2">
        <input
          type="checkbox"
          {...register("done")}
          value="true"
          className="toggle toggle-primary"
        />
        <span className="select-none">Done</span>
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "btn btn-sm btn-primary mt-4",
          isSubmitting && "loading"
        )}
      >
        Update
      </button>
    </form>
  );
}

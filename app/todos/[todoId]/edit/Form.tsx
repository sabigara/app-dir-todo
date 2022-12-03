"use client";

import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Schema = {
  title: string;
  done: "true" | "false";
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
      done: todo.done ? "true" : "false",
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
      <label className="block">
        <span className="block">What to do?</span>
        <textarea
          className="border rounded-md mt-2 p-3"
          {...register("title", {
            required: true,
          })}
        />
      </label>
      <fieldset>
        <legend className="mb-2">Status</legend>
        <label className="flex gap-2">
          <input type="radio" {...register("done")} value="true" />
          <span>Done</span>
        </label>
        <label className="flex gap-2">
          <input type="radio" {...register("done")} value="false" />
          <span>Not done</span>
        </label>
      </fieldset>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-block bg-purple-600 text-white rounded-md px-3 h-8 font-semibold"
      >
        {isSubmitting ? "loading..." : "Update"}
      </button>
    </form>
  );
}

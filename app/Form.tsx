"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Schema = {
  title: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Schema>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.refresh();
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
      <button type="submit" disabled={isSubmitting} className="button">
        {isSubmitting ? "loading..." : "Add"}
      </button>
    </form>
  );
}

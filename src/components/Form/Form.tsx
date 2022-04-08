import React from "react";
import { DefaultValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";

export type FormProps<T> = {
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit">;

const Form = <T extends Record<string, any> = Record<string, any>>({
  defaultValues,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  const methods = useForm<T>({ defaultValues, mode: "onBlur" });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
      {children(methods)}
    </form>
  );
};

export default Form;
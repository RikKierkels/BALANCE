import React from "react";
import { DefaultValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";

type FormProps = Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit">;
type Props<T> = {
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
} & FormProps;

const Form = <T extends Record<string, any> = Record<string, any>>({
  defaultValues,
  onSubmit,
  children,
  ...props
}: Props<T>) => {
  const methods = useForm<T>({ defaultValues, mode: "onBlur" });
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
      {children(methods)}
    </form>
  );
};

export default Form;
import React from "react";
import { Control, Controller, Path, UseControllerProps } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface IFormInput<T extends IEmployee> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
  controllerProps?: Omit<UseControllerProps<T>, "name">;
}

function FormInput<T extends IEmployee>(props: IFormInput<T>) {
  const { name, control, label, type, controllerProps = {} } = props;
  return (
    <Controller
      name={name}
      control={control}
      {...controllerProps}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={type}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value || ""}
          fullWidth
          label={label}
          variant="outlined"
          size="small"
        />
      )}
    />
  );
}

export default React.memo(FormInput);

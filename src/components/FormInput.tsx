import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface IFormInput<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
}

function FormInput<T extends FieldValues>(props: IFormInput<T>) {
  const { name, control, label, type } = props;
  return (
    <Controller
      name={name}
      control={control}
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

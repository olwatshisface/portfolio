import React, { HTMLInputTypeAttribute } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  Path,
  Control,
} from "react-hook-form";
import classNames from "classnames/bind";
import classes from "./Input.module.scss";

type InputProps<TData extends FieldValues> = {
  control: Control<FieldValues>;
  name: Path<TData>;
  rules?: RegisterOptions;
  className?: string;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  numFormatLanguage?: string;
  onBlur?: () => void;
  decimalScale?: number;
  maxFractionDigits?: number;
  testId?: string;
};

const Input = <TData extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder,
  errorMessage,
  type = "text",
  disabled = false,
  readOnly = false,
  onBlur,
  numFormatLanguage = "en-US",
  decimalScale = 0,
  maxFractionDigits,
}: InputProps<TData>): React.ReactElement => {
  const cx = classNames.bind(classes);

  const getDisplayValue = (value: string): string => {
    if (readOnly && !value) return "—";
    if (!value) return "";
    return value;
  };
  return (
    <div className={cx(classes.inputContainer, { disabled: disabled })}>
      {label ? (
        <label
          htmlFor={name}
          className={cx({
            "p-error": errorMessage,
          })}
        >
          <span className={classes.labelText}>{label}</span>
          <span className={classes.requiredIndicator}>
            {rules?.required && !readOnly ? "*" : ""}
          </span>
        </label>
      ) : null}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const isReadOnlyNoValue =
            readOnly && (field.value === "" || field.value == null);

          return type !== "number" || isReadOnlyNoValue ? (
            <InputText
              id={field.name}
              name={field.name}
              onBlur={(e) => {
                field.onChange(e.target.value.trim());
                field.onBlur();
              }}
              onChange={field.onChange}
              value={getDisplayValue(field.value)}
              type={isReadOnlyNoValue && type === "number" ? "text" : type}
              placeholder={placeholder}
              disabled={disabled && !readOnly}
              readOnly={readOnly}
              className={cx({
                "p-invalid": fieldState.error,
                [classes.readOnly]: readOnly,
              })}
              onBlurCapture={onBlur}
            />
          ) : (
            <InputNumber
              id={field.name}
              name={field.name}
              onBlur={field.onBlur}
              value={
                (field?.value?.value &&
                  Number(getDisplayValue(field.value?.value))) ||
                (field?.value && Number(getDisplayValue(field.value)))
              }
              onChange={(e) => {
                field.onChange(e.value);
              }}
              onValueChange={field.onChange}
              locale={numFormatLanguage}
              minFractionDigits={decimalScale}
              maxFractionDigits={maxFractionDigits}
              placeholder={placeholder}
              disabled={disabled && !readOnly}
              readOnly={readOnly}
              className={cx({
                "p-invalid": fieldState.error,
                [classes.readOnly]: readOnly,
                "p-disabled": disabled,
              })}
            />
          );
        }}
      />
    </div>
  );
};

export { Input };

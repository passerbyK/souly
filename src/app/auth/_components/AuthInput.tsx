import React from "react";

// Run: npx shadcn-ui@latest add input label
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  error: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function AuthInput({ label, type, value, error, setValue }: Props) {
  return (
    <>
      <div
        className={`${
          error !== "null" ? "mb-0" : "mb-2"
        } flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center`}
      >
        <Label className="w-[200px] text-center text-xl md:justify-center">
          {label}
        </Label>
        <Input
          type={type}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={`border-4 ${
            error !== "null" ? "border-rose-600" : "border-txt_4"
          } bg-btn_3 text-xl`}
        />
      </div>
      <div className="mb-2 flex w-full flex-col items-center text-center md:flex-row md:items-center">
        <div className="w-[180px]"></div>
        <div className="text-sm text-rose-600">
          {error == "username"
            ? "username can't be empty"
            : error == "email"
              ? "email can't be empty"
              : error == "password"
                ? "password can't be empty"
                : error == "confirmPassword"
                  ? "confirm password can't be empty"
                  : error == "length"
                    ? "password must contain at least 8 characters"
                    : error == "fail"
                      ? "confirm password doesn't match password, please try again"
                      : error == "wrong"
                        ? "wrong email or password"
                        : error == "duplicate"
                          ? "email already existed, please sign in"
                          : null}
        </div>
      </div>
    </>
  );
}

export default AuthInput;

import React from "react";

// Run: npx shadcn-ui@latest add input label
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function AuthInput({ label, type, value, setValue }: Props) {
  return (
    <div className="mb-2 flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-center">
      <Label className="w-[200px] text-center text-xl md:justify-center">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="border-4 border-txt_4 bg-btn_3 text-xl"
      />
    </div>
  );
}

export default AuthInput;

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
    <div className="w-full flex flex-col gap-4 text-center items-center md:flex-row md:items-center mb-2">
      <Label className="w-[200px] text-center text-xl md:justify-center">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="bg-btn_3 border-4 border-txt_4 text-xl"
      />
    </div>
  );
}

export default AuthInput;

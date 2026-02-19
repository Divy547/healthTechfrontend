"use client";

import { Input } from "@/components/ui/input";

interface DrugInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

export function DrugInput({
  value,
  onChange,
  error,
}: DrugInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="drug-input"
        className="block text-sm text-zinc-700"
      >
        Drug Name(s)
      </label>

      <Input
        id="drug-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Warfarin, Clopidogrel"
        className={error ? "border-red-300" : ""}
      />

      <div className="text-xs text-zinc-500">
        Enter one or more drug names separated by commas
      </div>

      {error ? (
        <div className="text-sm text-red-600">
          {error}
        </div>
      ) : null}
    </div>
  );
}

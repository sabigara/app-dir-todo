"use client";

type Props = {
  value: boolean;
  onChange: (val: boolean) => void;
};

export function SidebarFilterSwitch({ value, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  return (
    <label className="label">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={value}
        className="toggle toggle-primary"
      />
      Not done only
    </label>
  );
}

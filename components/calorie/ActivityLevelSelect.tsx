import { ACTIVITY_LEVELS } from "@/constants/pal";
import type { ActivityIndex } from "@/constants/pal";
import { CALORIE_TOOL_INPUT } from "@/components/calorie/calorie-field-classes";

type ActivityLevelSelectProps = {
  id: string;
  value: ActivityIndex;
  onChange: (i: ActivityIndex) => void;
  "aria-describedby"?: string;
};

export function ActivityLevelSelect({
  id,
  value,
  onChange,
  "aria-describedby": ariaDescribedBy,
}: ActivityLevelSelectProps) {
  return (
    <div className="relative min-w-0">
      <select
        id={id}
        className={`${CALORIE_TOOL_INPUT} w-full cursor-pointer pr-10`}
        aria-describedby={ariaDescribedBy}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as ActivityIndex)}
      >
        {ACTIVITY_LEVELS.map((lvl) => (
          <option key={lvl.id} value={lvl.id}>
            {lvl.label}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-fg-dim"
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

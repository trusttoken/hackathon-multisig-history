import { IconBase, IconProps } from "./IconBase";

export const LoadingCircleIcon = ({ color, size, className }: IconProps) => {
  return (
    <IconBase color={color} size={size} className={className}>
      <circle
        cx="8"
        cy="8"
        r="7"
        strokeWidth="1.5"
        stroke="currentColor"
        strokeLinecap="round"
        opacity="0.25"
      />
      <circle
        cx="8"
        cy="8"
        r="7"
        strokeWidth="1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeDasharray="45"
        strokeDashoffset="60"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 8 8"
          to="360 8 8"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </IconBase>
  );
};

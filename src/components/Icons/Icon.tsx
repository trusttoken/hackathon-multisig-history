import React from "react";
import styled from "styled-components";
import { UseTransientProps } from "types";

type FontWeight = "normal" | "bold";

export interface IconProps {
  color?: string;
  size?: number;
  fill?: boolean;
  weight?: FontWeight;
  className?: string;
}

interface IconBaseProps extends IconProps {
  children: string;
}

export function Icon({
  children,
  color = "inherit",
  size = 16,
  fill,
  weight,
}: IconBaseProps) {
  return (
    <IconContainer
      color={color}
      size={size}
      className="material-symbols-rounded"
      $fill={fill}
      weight={weight}
    >
      {children}
    </IconContainer>
  );
}

type IconContainerProps = UseTransientProps<IconBaseProps, "fill">;
const IconContainer = styled.span<IconContainerProps>`
  font-family: "Material Symbols Rounded";
  font-weight: ${({ weight }) => weight ?? "normal"};
  font-style: normal;
  font-size: ${({ size }) => (size ? size + "px" : "16px")} !important;
  color: ${({ color }) => color};
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  font-variation-settings: "FILL" ${({ $fill }) => ($fill ? 1 : 0)};
`;

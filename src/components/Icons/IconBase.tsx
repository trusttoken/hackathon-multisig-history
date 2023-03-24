import React from "react";
import styled from "styled-components";

export interface IconProps {
  color?: string;
  size?: number;
  className?: string;
}

interface IconBaseProps extends IconProps {
  children: React.ReactNode;
  viewBox?: string;
}

export function IconBase({
  children,
  color = "inherit",
  size = 16,
  viewBox = "0 0 16 16",
  className,
}: IconBaseProps) {
  return (
    <IconContainer color={color} size={size} className={className}>
      <IconWrapper
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        color="currentColor"
      >
        {children}
      </IconWrapper>
    </IconContainer>
  );
}

export const IconContainer = styled.div<IconBaseProps>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size + "px"};
  min-width: ${({ size }) => size + "px"};
  max-width: ${({ size }) => size + "px"};
  height: ${({ size }) => size + "px"};
  min-height: ${({ size }) => size + "px"};
  max-height: ${({ size }) => size + "px"};
  color: ${({ color }) => color};
  overflow: hidden;
`;

const IconWrapper = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

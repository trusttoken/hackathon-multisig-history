import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { BorderRadiuses } from "styles";
import { body2, body3 } from "../general/Text";

export type BadgeColor =
  | "gray"
  | "green"
  | "darkGreen"
  | "orange"
  | "red"
  | "blue"
  | "purple";

interface BadgeProps {
  className?: string;
  color?: BadgeColor;
  textSize?: "small" | "medium";
  size?: "small" | "medium";
  maxWidth?: number;
  wide?: boolean;
  icon?: ReactNode;
  iconColor?: string;
}

export interface BadgeComponentProps extends BadgeProps {
  children: string | ReactNode;
}

export const Badge = ({
  children,
  className,
  color = "gray",
  textSize,
  maxWidth,
  wide,
  icon,
  iconColor,
  size = "small",
}: BadgeComponentProps) => (
  <BadgeContainer
    size={size}
    color={color}
    className={className}
    maxWidth={maxWidth}
    textSize={textSize}
    wide={wide}
  >
    {icon && <IconWrapper color={iconColor}>{icon}</IconWrapper>}
    {children}
  </BadgeContainer>
);

const greenBadgeStyles = css`
  color: ${({ theme }) => theme.colors.Emerald};
  border-color: ${({ theme }) => theme.colors.Emerald};
`;

const darkGreenBadgeStyles = css`
  color: ${({ theme }) => theme.colors.OxidizedGreen};
  border-color: ${({ theme }) => theme.colors.OxidizedGreen};
`;

const orangeBadgeStyles = css`
  color: ${({ theme }) => theme.colors.Fulvous};
  border-color: ${({ theme }) => theme.colors.Fulvous};
`;

const redBadgeStyles = css`
  color: ${({ theme }) => theme.colors.PersianRed};
  border-color: ${({ theme }) => theme.colors.PersianRed};
`;

const blueBadgeStyles = css`
  color: ${({ theme }) => theme.colors.Cornflower};
  border-color: ${({ theme }) => theme.colors.Cornflower};
`;

const grayBadgeStyles = css`
  color: ${({ theme }) => theme.colors.Text02};
  border-color: ${({ theme }) => theme.colors.Iron};
`;

const purpleBadgeStyles = css`
  color: ${({ theme }) => theme.colors.Purpureus};
  border-color: ${({ theme }) => theme.colors.Purpureus};
`;

export const BadgeContainer = styled.span<BadgeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: ${({ wide }) => (wide ? "100%" : "fit-content")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth + "px" : "100%")};
  height: fit-content;
  border-radius: ${BorderRadiuses.full};
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  font-weight: 500;
  overflow: hidden;

  padding: ${({ size }) => {
    switch (size) {
      case "small":
      default:
        return "6px 8px";
      case "medium":
        return "8px 10px";
    }
  }};

  ${({ color }) => {
    switch (color) {
      case "gray":
      default:
        return grayBadgeStyles;
      case "green":
        return greenBadgeStyles;
      case "darkGreen":
        return darkGreenBadgeStyles;
      case "orange":
        return orangeBadgeStyles;
      case "red":
        return redBadgeStyles;
      case "blue":
        return blueBadgeStyles;
      case "purple":
        return purpleBadgeStyles;
    }
  }};

  ${({ textSize }) => {
    switch (textSize) {
      case "small":
      default:
        return body3;
      case "medium":
        return body2;
    }
  }};
`;

const IconWrapper = styled.div`
  color: ${({ color }) => color || "inherit"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

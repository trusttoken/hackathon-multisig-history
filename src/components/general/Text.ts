import styled, { css } from "styled-components";

export type TextVariant =
  | "title1"
  | "title2"
  | "title3"
  | "body1"
  | "body2"
  | "body3"
  | "default";
export type TextColor =
  | "extra-light"
  | "light"
  | "medium"
  | "dark"
  | "error"
  | "default"
  | "success";

export interface TextProps {
  classList?: string;
  variant?: TextVariant;
  color?: TextColor;
  bold?: boolean;
  extraBold?: boolean;
  underline?: boolean;
  light?: boolean;
}

export const body3 = css`
  font-size: 12px;
  line-height: 16px;
`;

export const body2 = css`
  font-size: 14px;
  line-height: 20px;
`;

const body1 = css`
  font-size: 16px;
  line-height: 24px;
`;

const title3 = css`
  font-size: 20px;
  line-height: 24px;
`;

const title2 = css`
  font-size: 24px;
  line-height: 32px;
`;

const title1 = css`
  font-size: 32px;
  line-height: 40px;
`;

const defaultSize = css`
  font-size: inherit;
  line-height: inherit;
`;

const commonTextStyles = css<TextProps>`
  margin: 0;
  padding: 0;
  ${({ variant }) => {
    switch (variant) {
      case "title1":
        return title1;
      case "title2":
        return title2;
      case "title3":
        return title3;
      case "body1":
      default:
        return body1;
      case "body2":
        return body2;
      case "body3":
        return body3;
      case "default":
        return defaultSize;
    }
  }};
  color: ${({ color, theme }) => {
    switch (color) {
      case "default":
        return "inherit";
      case "extra-light":
        return theme.colors.Text0;
      case "light":
        return theme.colors.Text01;
      case "medium":
        return theme.colors.Text02;
      case "dark":
        return theme.colors.Text03;
      case "error":
        return theme.colors.PersianRed;
      case "success":
        return theme.colors.Emerald;
      default:
        return theme.colors.Text02;
    }
  }};
  font-weight: ${({ bold, extraBold, light }) => {
    if (extraBold) return "800";
    if (bold) return "700";
    if (light) return "400";
    return "500";
  }};
  text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
`;

export const Text = styled.p<TextProps>`
  ${commonTextStyles}
`;
export const TextInline = styled.span<TextProps>`
  ${commonTextStyles}
`;

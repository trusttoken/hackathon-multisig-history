import React, { CSSProperties, forwardRef, ReactNode } from "react";
import styled, { css } from "styled-components";
import { BorderRadiuses, Transitions } from "styles";
import { UseTransientProps } from "types";
import { Icon } from "components/Icons";

export interface ButtonSafeStylePropsBase {
  wide?: boolean;
  narrow?: boolean;
  loading?: boolean;
}

export interface ButtonBaseProps {
  children?: ReactNode;
  className?: string;
  view?: "primary" | "secondary" | "tertiary" | "danger" | "link";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  type?: "submit" | "button" | "reset";
  style?: CSSProperties;
  form?: string;
}

type ButtonSafeStyleBaseProps = UseTransientProps<
  ButtonSafeStylePropsBase,
  "loading" | "wide" | "narrow"
>;

export type ButtonProps = ButtonBaseProps & ButtonSafeStylePropsBase;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      view,
      size = "medium",
      narrow,
      wide,
      icon,
      iconPosition,
      disabled,
      loading,
      onClick,
      ...props
    },
    ref
  ) {
    return (
      <ButtonContainer
        className={className}
        view={view}
        size={size}
        $wide={wide}
        $narrow={narrow}
        disabled={disabled || loading}
        $innerDisabled={disabled || loading}
        icon={icon}
        $loading={loading}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {loading ? (
          <Icon>loading</Icon>
        ) : (
          <ButtonInnerContainer isIconButton={!children}>
            {children}
            {icon && (
              <IconComponent
                icon={icon}
                iconPosition={iconPosition}
                isIconButton={!children}
              />
            )}
          </ButtonInnerContainer>
        )}
      </ButtonContainer>
    );
  }
);

interface IconComponentProps {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
  isIconButton: boolean;
}

export const IconComponent = ({
  icon,
  iconPosition = "left",
  isIconButton,
}: IconComponentProps) => {
  return (
    <ButtonIconContainer
      iconPosition={iconPosition}
      isIconButton={isIconButton}
    >
      <ButtonIcon>{icon}</ButtonIcon>
    </ButtonIconContainer>
  );
};

const commonButtonStyles = css<ButtonSafeStyleBaseProps>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  width: ${({ $wide }) => ($wide ? "100%" : "fit-content")};
  margin: 0;
  padding: 0;
  border: none;
  font-family: "Manrope", Helvetica, Arial, sans-serif;
  font-weight: 400;
  text-align: center;
  background-color: transparent;
  outline: none;
  overflow: hidden;
  white-space: nowrap;
`;

const expandedButtonStyles = css<
  Pick<ButtonBaseProps, "size" | "icon"> & ButtonSafeStyleBaseProps
>`
  min-width: ${({ size, $narrow }) => {
    if ($narrow) return "32px";
    switch (size) {
      case "small":
        return "132px";
      case "medium":
      case "large":
      default:
        return "208px";
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case "medium":
      default:
        return "40px";
      case "small":
        return "32px";
      case "large":
        return "48px";
    }
  }};
  padding: ${({ size, $narrow }) => {
    if ($narrow) return "4px";
    switch (size) {
      case "small":
        return "4px 16px";
      case "medium":
      default:
        return "8px 16px";
      case "large":
        return "12px 16px";
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "14px";
      case "medium":
      case "large":
      default:
        return "16px";
    }
  }};
  line-height: ${({ size }) => {
    switch (size) {
      case "small":
        return "20px";
      case "medium":
      case "large":
      default:
        return "24px";
    }
  }};
  border: 1px solid transparent;
  border-radius: ${BorderRadiuses.s};
  transition: ${Transitions.all};
`;

export const LinkButtonStylesHover = css`
  color: ${({ theme }) => theme.colors.CopperOrange};
  text-decoration: underline;
`;

const LinkButtonStyles = css`
  ${commonButtonStyles}
  ${expandedButtonStyles}
  &:hover {
    ${LinkButtonStylesHover}
  }
  &:focus-visible {
    ${LinkButtonStylesHover}
  }
  &:active {
    ${LinkButtonStylesHover}
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.Iron};
  }
`;

interface ButtonInnerStyleProps {
  innerDisabled?: boolean;
}

type ButtonInnerSafeStyleProps = UseTransientProps<
  ButtonInnerStyleProps,
  "innerDisabled"
>;

const PrimaryButtonStylesHover = css`
  background-color: ${({ theme }) => theme.colors.CopperOrange};
  border-color: ${({ theme }) => theme.colors.CopperOrange};
  color: ${({ theme }) => theme.colors.White};
`;

const PrimaryButtonStylesDisabled = css<ButtonInnerSafeStyleProps>`
  ${({ $innerDisabled }) =>
    $innerDisabled &&
    css`
      &:disabled {
        background-color: ${({ theme }) => theme.colors.GrayNurse};
        border-color: ${({ theme }) => theme.colors.Iron};
        color: ${({ theme }) => theme.colors.Iron};
      }
    `}
`;

const PrimaryButtonStyles = css<
  ButtonSafeStyleBaseProps & ButtonInnerSafeStyleProps
>`
  ${commonButtonStyles}
  ${expandedButtonStyles}
  background-color: ${({ theme }) => theme.colors.HeavyMetal};
  border-color: ${({ theme }) => theme.colors.HeavyMetal};
  color: ${({ theme }) => theme.colors.White};
  &:hover {
    ${PrimaryButtonStylesHover}
  }
  &:focus-visible {
    ${PrimaryButtonStylesHover}
  }
  &:active {
    ${PrimaryButtonStylesHover}
  }
  ${PrimaryButtonStylesDisabled}
`;

const SecondaryButtonStyles = css<
  ButtonSafeStyleBaseProps & ButtonInnerSafeStyleProps
>`
  ${commonButtonStyles}
  ${expandedButtonStyles}
  background-color: ${({ theme }) => theme.colors.White};
  border-color: ${({ theme }) => theme.colors.HeavyMetal};
  color: ${({ theme }) => theme.colors.HeavyMetal};
  &:hover {
    ${PrimaryButtonStylesHover}
  }
  &:focus-visible {
    ${PrimaryButtonStylesHover}
  }
  &:active {
    ${PrimaryButtonStylesHover}
  }
  ${PrimaryButtonStylesDisabled}
`;

const TertiaryButtonStyles = css<
  ButtonSafeStyleBaseProps & ButtonInnerSafeStyleProps
>`
  ${commonButtonStyles}
  ${expandedButtonStyles}
  background-color: ${({ theme }) => theme.colors.HeavyMetal};
  border-color: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.White};
  &:hover {
    ${PrimaryButtonStylesHover}
  }
  &:focus-visible {
    ${PrimaryButtonStylesHover}
  }
  &:active {
    ${PrimaryButtonStylesHover}
  }
  ${({ $innerDisabled }) =>
    $innerDisabled &&
    css`
      &:disabled {
        background-color: ${({ theme }) => theme.colors.CapeCod};
        border-color: ${({ theme }) => theme.colors.CapeCod};
        color: ${({ theme }) => theme.colors.Corduroy};
      }
    `}
`;

const DangerButtonStylesHover = css`
  background-color: ${({ theme }) => theme.colors.PersianRed};
  border-color: ${({ theme }) => theme.colors.PersianRed};
  color: ${({ theme }) => theme.colors.White};
`;

const DangerButtonStyles = css<
  Pick<ButtonBaseProps, "size"> &
    ButtonSafeStyleBaseProps &
    ButtonInnerSafeStyleProps
>`
  ${commonButtonStyles}
  ${expandedButtonStyles}
  background-color: ${({ theme }) => theme.colors.White};
  border-color: ${({ theme }) => theme.colors.PersianRed};
  color: ${({ theme }) => theme.colors.PersianRed};
  &:hover {
    ${DangerButtonStylesHover}
  }
  &:focus-visible {
    ${DangerButtonStylesHover}
  }
  &:active {
    ${DangerButtonStylesHover}
  }
  ${PrimaryButtonStylesDisabled}
`;

export const ButtonContainer = styled.button<
  ButtonBaseProps & ButtonSafeStyleBaseProps & ButtonInnerSafeStyleProps
>`
  ${({ view }) => {
    switch (view) {
      case "link":
      default:
        return LinkButtonStyles;
      case "primary":
        return PrimaryButtonStyles;
      case "secondary":
        return SecondaryButtonStyles;
      case "tertiary":
        return TertiaryButtonStyles;
      case "danger":
        return DangerButtonStyles;
    }
  }};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const ButtonInnerContainer = styled.div<
  Pick<IconComponentProps, "isIconButton">
>`
  position: relative;
  display: flex;
  align-items: center;
  ${({ isIconButton }) =>
    isIconButton &&
    css`
      width: 100%;
      height: 100%;
    `};
`;

export const ButtonIconContainer = styled.div<
  Pick<IconComponentProps, "iconPosition" | "isIconButton">
>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 16px;
  width: 16px;
  max-width: 16px;
  height: 16px;
  color: inherit;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ iconPosition }) => (iconPosition === "left" ? "-24px" : "unset")};
  right: ${({ iconPosition }) =>
    iconPosition === "right" ? "-24px" : "unset"};

  ${({ isIconButton }) =>
    isIconButton &&
    css`
      left: 50%;
      transform: translate(-50%, -50%);
    `};
`;

const ButtonIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;

  & > svg {
    color: inherit;
  }
`;

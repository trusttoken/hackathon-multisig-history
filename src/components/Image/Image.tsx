import Image, { ImageProps as NextImageProps } from "next/image";
import styled, { css } from "styled-components";
import { StaticImageData } from "next/image";

import { BorderRadiuses, Transitions } from "styles";
import { defaultImage } from "./defaultImage";

export interface ImageProps {
  image: string | StaticImageData;
  alt?: string;
  size?: number;
  variant?: "square" | "circle" | "full";
  fallback?: string;
  className?: string;
}

type PlaceholderValue = NextImageProps["placeholder"];

export const Img = ({
  image,
  alt = "",
  size = 32,
  variant = "circle",
  fallback = defaultImage,
  className,
}: ImageProps) => {
  const placeholder: PlaceholderValue = size < 40 ? "empty" : "blur";

  return (
    <ImageContainer size={size} variant={variant} className={className}>
      <Image
        src={image}
        alt={alt}
        width={size}
        height={size}
        placeholder={placeholder}
        blurDataURL={fallback}
      />
    </ImageContainer>
  );
};

const ImageContainer = styled.div<
  Pick<ImageProps, "size" | "variant" | "className">
>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size }) => css`
    width: ${size}px;
    min-width: ${size}px;
    max-width: ${size}px;
    height: ${size}px;
    min-height: ${size}px;
    max-height: ${size}px;
  `}
  border-radius: ${({ variant }) => {
    switch (variant) {
      case "circle":
        return "100%";
      case "square":
      default:
        return BorderRadiuses.s;
      case "full":
        return 0;
    }
  }};
  transition: ${Transitions.all};
  overflow: hidden;
`;

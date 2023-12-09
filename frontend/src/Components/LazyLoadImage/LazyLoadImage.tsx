import React, { useState } from "react";
import { base64 } from "./base64";
import styled from "styled-components";
type Props = {
  src: string;
  alt?: string;
  fallbackImage?: string;
  loaded?: boolean;
  borderRadius?: string;
};


const BlurLoad = styled.div<Pick<Props, "fallbackImage" | "loaded" | "borderRadius">>`
  padding: 0;
  margin: 0;
  background-image: ${(props) =>
    props.fallbackImage ? `url(${props.fallbackImage})` : `url(${base64})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "0")};
  img {
    opacity: ${(props) => (props.loaded ? "1" : "0")};
    transition: opacity 200ms ease-in-out;
    width: 100%;
    height: 100%;
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : "0"};
  }
  &::before {
    content: ${(props) => (props.loaded ? "none" : "")};
    position: absolute;
    inset: 0;
    opacity: 0;
  }
`;


const LazyLoadImage = ({ src, alt, fallbackImage, borderRadius }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <BlurLoad
      borderRadius={borderRadius}
      loaded={loaded}
      fallbackImage={fallbackImage}
    >
      <img onLoad={() => setLoaded(true)} src={src} loading="lazy" alt={alt} />
    </BlurLoad>
  );
};

export default LazyLoadImage;

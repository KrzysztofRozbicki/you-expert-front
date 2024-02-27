import { memo } from 'react';
import { Image } from '@chakra-ui/react';

const Edge = (props) => {
  const { w, h, top, right, src, alt, customStyle, ...otherProps } = props;
  const defaultStyle = { position: 'absolute' };
  const fotmattedStyle = { ...defaultStyle, ...customStyle };
  const altFromSrc = src ? src.split('.', 1)[0] : 'Some icon';

  return (
    <Image
      top={top}
      right={right}
      w={w}
      h={h}
      style={fotmattedStyle}
      src={src}
      alt={alt || altFromSrc}
      {...otherProps}
    />
  );
};

export default memo(Edge);

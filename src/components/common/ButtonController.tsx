import { Button } from '@chakra-ui/react';

export const ButtonController = (props) => {
  const {
    variant,
    customStyle,
    children,
    onClick,
    asLink,
    customM,
    cp,
    height,
    mh,
    isDisabled,
    w,
    ...otherProps
  } = props;
  const buttonStyle = {
    width: 'auto',
    minHeight: '72px',
    fontWeight: 600,
    padding: '19px 32px',
    outline: 'none',
    background: '#7A72DF',
    color: '#fff'
  };

  const buttonLinkStyle = {
    background: 'transparent',
    color: '#020055',
    textDecoration: 'underline',
    padding: '0'
  };

  if (variant === 'yellow') {
    buttonStyle.background = '#F7D39B';
    buttonStyle.color = '#020055';
  } else if (variant === 'orange') {
    buttonStyle.background = '#EC8581';
  } else if (variant === 'grey') {
    buttonStyle.background = '#DCDCF4';
    buttonStyle.color = '#280363';
  } else if (variant === 'pink') {
    buttonStyle.background = '#EC8581';
  } else if (variant === 'darkPurpul') {
    buttonStyle.background = '#DCDCF4';
    buttonStyle.color = '#280363';
  } else if (variant === 'red') {
    buttonStyle.background = '#D74F3E';
    buttonStyle.color = '#fff';
  }

  if (asLink) {
    return (
      <Button
        w={w}
        minHeight={mh}
        p={cp}
        m={customM || ''}
        onClick={onClick}
        style={{ ...buttonLinkStyle, ...customStyle }}
        _hover={{ background: 'transparent' }}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      h={height}
      w={w}
      minHeight={mh}
      p={cp}
      m={customM || ''}
      onClick={onClick}
      style={{ ...buttonStyle, ...customStyle }}
      isDisabled={isDisabled}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

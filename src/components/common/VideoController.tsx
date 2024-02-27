import React, { memo } from 'react';
import { Flex } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { screenSizesString } from '../../styles/theme/breakpoints';

const FlexStyled = styled(Flex)<{ isNeedToBeAdaptive?: boolean }>`
  ${({ isNeedToBeAdaptive }): string =>
    isNeedToBeAdaptive
      ? `   
          @media (min-width: ${screenSizesString?.sm}) {
              width: 111px;
              height: 143px;
          }

          @media (min-width: 375px) {
              width: 302px;
              height: 170px;
          }

          @media (min-width: 425px) {
              width: 348px;
              height: 196px;
          }

          @media (min-width: ${screenSizesString?.md}) {
              width: 659px;
              height: 371px;
          }

          @media (min-width: ${screenSizesString?.lg}) {
            width: 832px;
            height: 468px;
          }

          @media (min-width: ${screenSizesString?.xl}) {
            width: 887px;
            height: 499px;
          }
      `
      : ''}
`;

const VideoController = (props) => {
  const {
    url,
    autoplay,
    controls,
    customStyle,
    playing,
    onClick,
    w,
    h,
    wrapperProps,
    isNeedToBeAdaptive
  } = props;
  const formattedStyle = customStyle ? customStyle : {};
  const onClickFunc = onClick ? onClick : () => true;

  return (
    <FlexStyled
      style={formattedStyle}
      isNeedToBeAdaptive={isNeedToBeAdaptive}
      {...wrapperProps}
    >
      <ReactPlayer
        url={url}
        controls={controls}
        playing={playing}
        autoplay={autoplay}
        width={w || '100%'}
        onPlay={onClickFunc}
        onEnded={onClickFunc}
        height={h || '100%'}
        // config={videoConfig}
      />
    </FlexStyled>
  );
};

export default memo(VideoController);

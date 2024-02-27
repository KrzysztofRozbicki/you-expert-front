import React, { memo } from 'react';
import { Image, Flex, Text } from '@chakra-ui/react';
import { TitleWrapperStyles, TitleTextStyled } from './style';
import RequiredMark from '../../../../common/RequiredMark';

interface TitleProps {
  title: string;
  underTitleText?: string;
  titleIconSrc?: string;
  isRequired?: boolean;
}

const Title: React.FC<TitleProps> = ({
  title,
  titleIconSrc,
  isRequired,
  underTitleText
}) => {
  return (
    <TitleWrapperStyles p={{ sm: '30px', lg: '64px 119px 43px 119px' }}>
      <Flex
        mr={titleIconSrc ? '10px' : '0'}
        justifyContent="center"
        flexDirection="column"
      >
        <TitleTextStyled fontSize={{ sm: '1.2rem', lg: '1.6rem' }}>
          {title} {isRequired && <RequiredMark />}
        </TitleTextStyled>
        {!!underTitleText && (
          <Text fontSize="0.8rem" marginTop="5px">
            {underTitleText}
          </Text>
        )}
      </Flex>
      {titleIconSrc && <Image src={titleIconSrc} />}
    </TitleWrapperStyles>
  );
};

export default memo(Title);

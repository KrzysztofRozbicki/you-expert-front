import React, { memo, useRef, useEffect, useCallback, useState } from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import {
  ServiceWrapperStyled,
  IconWrapperStyled,
  ContentBlockStyled
} from './style';

interface ServicesListProps {
  servicesList: any[];
  onServiceClick: (serviceItem: any) => void;
}

const ServicesList: React.FC<ServicesListProps> = (props) => {
  const { servicesList, onServiceClick } = props;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentBlockRef = useRef<HTMLDivElement | null>(null);
  const [arrowState, setArrowState] = useState<{
    isShouldShowLeftArrow: boolean;
    isShouldShowRightArrow: boolean;
  }>({
    isShouldShowLeftArrow: false,
    isShouldShowRightArrow: false
  });

  const handleScroll = useCallback(() => {
    if (wrapperRef?.current && contentBlockRef?.current) {
      const newArrowState = {
        isShouldShowLeftArrow: false,
        isShouldShowRightArrow: false
      };

      if (contentBlockRef?.current?.scrollLeft > 0) {
        newArrowState.isShouldShowLeftArrow = true;
      }

      if (
        contentBlockRef?.current?.scrollWidth >
          wrapperRef?.current?.clientWidth &&
        contentBlockRef?.current?.scrollLeft +
          contentBlockRef?.current?.offsetWidth <
          contentBlockRef?.current?.scrollWidth
      ) {
        newArrowState.isShouldShowRightArrow = true;
      }

      setArrowState(newArrowState);
    }
  }, [wrapperRef?.current, contentBlockRef?.current, servicesList]);

  const handleClickRightArrow = useCallback(() => {
    if (contentBlockRef?.current) {
      contentBlockRef.current.scrollLeft =
        contentBlockRef?.current?.scrollLeft +
        contentBlockRef?.current?.clientWidth;
    }
  }, [contentBlockRef?.current, servicesList]);

  const handleClickLeftArrow = useCallback(() => {
    if (contentBlockRef?.current) {
      contentBlockRef.current.scrollLeft =
        contentBlockRef?.current?.scrollLeft -
        contentBlockRef?.current?.clientWidth;
    }
  }, [contentBlockRef?.current, servicesList]);

  useEffect(() => {
    if (contentBlockRef?.current) {
      handleScroll();
      contentBlockRef?.current?.addEventListener('scroll', handleScroll);
    }
    return () => {
      contentBlockRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [contentBlockRef?.current, wrapperRef?.current, servicesList]);

  return (
    <>
      {!!servicesList?.length && (
        <Flex w="100%" ref={wrapperRef} position="relative">
          <ContentBlockStyled
            w="100%"
            overflowX="auto"
            className="hide-scrollbar"
            mt={{ sm: '15px', lg: '34px' }}
            ref={contentBlockRef}
          >
            {arrowState.isShouldShowLeftArrow && (
              <Flex
                w="90px"
                position="absolute"
                left="-20px"
                top={{ sm: '15px', lg: '34px' }}
                bottom="0"
                alignItems="center"
                background="linear-gradient(-270deg, #FFF 43.16%, hsla(0,0%,100%,0))"
                zIndex={2}
                onClick={handleClickLeftArrow}
                cursor="pointer"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="30px"
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Flex>
            )}
            {arrowState.isShouldShowRightArrow && (
              <Flex
                w="90px"
                position="absolute"
                right="-20px"
                top={{ sm: '15px', lg: '34px' }}
                bottom="0"
                alignItems="center"
                justifyContent="flex-end"
                background="linear-gradient(270deg, #FFF 43.16%, hsla(0,0%,100%,0))"
                zIndex={2}
                onClick={handleClickRightArrow}
                cursor="pointer"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="30px"
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Flex>
            )}
            {servicesList?.map((item, index) => (
              <Flex
                key={index}
                width={{ sm: '140px', lg: '210px' }}
                minWidth={{ sm: '140px', lg: '210px' }}
                h={{ sm: '90px', lg: '134px' }}
                borderRadius="10px"
                overflow="hidden"
                cursor="pointer"
                marginRight="20px"
                position="relative"
                onClick={() => onServiceClick(item)}
              >
                <ServiceWrapperStyled
                  w="100%"
                  height="100%"
                  p="30px"
                  overflow="hidden"
                  alignItems="center"
                  justifyContent="center"
                  zIndex={1}
                  position="relative"
                >
                  <Text
                    fontSize="0.9rem"
                    color="#fff"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {item?.name}
                  </Text>
                  <IconWrapperStyled
                    position="absolute"
                    top={{ sm: 'calc(50% + 15px)', lg: 'calc(50% + 25px)' }}
                    left="50%"
                    transform="translate(-50%)"
                    w={{ sm: '21px', lg: '28px' }}
                    height={{ sm: '21px', lg: '28px' }}
                    background="#fff"
                    borderRadius="50%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 1.33325L6.64212 5.97537L2 10.6175"
                        stroke="#EC8581"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconWrapperStyled>
                </ServiceWrapperStyled>
                <Flex position="absolute" top="0" left="0" right="0" bottom="0">
                  {item?.cardBackgroundUrl && (
                    <Image
                      src={item?.cardBackgroundUrl}
                      w="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  )}
                </Flex>
              </Flex>
            ))}
          </ContentBlockStyled>
        </Flex>
      )}
    </>
  );
};

export default memo(ServicesList);

import React, { memo } from 'react';
import Link from 'next/link';
import { Flex } from '@chakra-ui/react';
import { WrapperStyled, TextStyled } from './style';

interface BreadcrumbsProps {
  renderItems: { title: string; link?: string }[];
  wrapperStyle?: { [key: string]: string | number };
  wrapperProps?: { [key: string]: any };
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  const { renderItems, wrapperStyle, wrapperProps } = props;

  return (
    <WrapperStyled style={wrapperStyle} {...wrapperProps}>
      {renderItems.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === renderItems.length - 1;

        return (
          <React.Fragment key={index}>
            {isFirst && (
              <Flex mr="10px">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.5 18.5V14C6.5 12.619 7.619 11.5 9 11.5V11.5C10.381 11.5 11.5 12.619 11.5 14V18.5H17V9.91401C17 9.38401 16.789 8.87501 16.414 8.50001L9.707 1.79301C9.316 1.40201 8.683 1.40201 8.293 1.79301L1.586 8.50001C1.211 8.87501 1 9.38401 1 9.91401V18.5H6.5Z"
                    stroke="#EC8581"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Flex>
            )}

            {isLast ? (
              <TextStyled isLast={isLast}>{item.title}</TextStyled>
            ) : (
              <Link href={item?.link}>
                <a style={{ fontSize: '0.8rem' }}>{item.title}</a>
              </Link>
            )}

            {!isLast && (
              <Flex alignItems="center" mr="23px">
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L5 5L1 1"
                    stroke="#BDBDDE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Flex>
            )}
          </React.Fragment>
        );
      })}
    </WrapperStyled>
  );
};

export default memo(Breadcrumbs);

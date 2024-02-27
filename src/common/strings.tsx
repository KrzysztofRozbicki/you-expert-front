import { Heading } from '@chakra-ui/react';
import { apiHost } from '../api/common';

export const getAltFromImage = (imagePath: string) => {
  return imagePath.split('.', 1)[0];
};

export const getFormattedHeading = (
  sentence: any,
  wordCount: number,
  isH1: boolean,
  headingStyle: any,
  wordStyle?: any,
  m?: any,
) => {
  const separatedSentence = sentence.split(' ');
  return (
    <Heading
      key={`headding-item-${separatedSentence[0]}`}
      textAlign="center"
      as="h2"
      m={m}
      fontSize={
        headingStyle?.fontSize
          ? headingStyle?.fontSize
          : isH1
          ? { sm: '2.8rem !important', xl: '2.8rem !important' }
          : { sm: '2.8rem !important', xl: '2.8rem !important' }
      }
      fontWeight="400"
      lineHeight={
        isH1 ? { sm: '60px', xl: '68px' } : { sm: '48px', xl: '58px' }
      }
      style={headingStyle}
    >
      {separatedSentence.map((word, wordIndex) => {
        if (wordIndex + 1 === wordCount) {
          return <span style={wordStyle}>{`${word} `}</span>;
        }
        return `${word} `;
      })}
    </Heading>
  );
};

export const getImagePath = (imageData) => {
  if (!imageData) return '';

  return `${apiHost}${imageData}`;
};

export const validateEmail = (mail) => {
  if (!mail) return { status: false, message: 'empty' };
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return { status: true };
  }
  return { status: false, message: `invalid` };
};

export const validatePassword = (password) => {
  if (!password) return { status: false, message: 'empty' };
  if (password.length < 8) return { status: false, message: 'short' };
  if (
    !/(?=.*[a-z])/.test(password) ||
    !/(?=.*[A-Z])/.test(password) ||
    !/(?=.*[0-9])/.test(password)
  ) {
    return { status: false, message: 'invalid' };
  }
  return { status: true, message: '' };
};

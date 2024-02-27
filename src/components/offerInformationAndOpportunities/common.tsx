import { Button, Image } from '@chakra-ui/react';

export const sliderWrapperStyles = {
  border: '1px solid #DCDCF4',
  borderRadius: '5px',
  padding: '40px 45px',
  width: '100%'
};

export const prevArrow = (
  <Button
    w="41px"
    h="41px"
    display="flex"
    position="absolute"
    justifyContent="center"
    p="0 !important"
    _before={{ display: 'none' }}
    left="-70px"
  >
    <Image m="0 auto" src="/images/common/slider/Prev_arrow.svg" />
  </Button>
);

export const nextArrow = (
  <Button
    bg="general.dark"
    w="41px"
    h="41px"
    display="flex"
    position="absolute"
    justifyContent="center"
    p="0 !important"
    _before={{ display: 'none' }}
    right="-70px"
    _active={{ backgroundColor: '#020055' }}
    _focus={{ backgroundColor: '#020055' }}
    _hover={{ backgroundColor: '#020055' }}
  >
    <Image m="0 auto" src="/images/common/slider/Next_arrow.svg" />
  </Button>
);

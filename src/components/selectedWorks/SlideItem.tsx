import {
  Flex,
  Box,
  Button,
  Image,
  Heading,
  Avatar,
  Text
} from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import { getFormattedHeading } from '../../common/strings';

import styles from './SliderItem.module.scss';

const SlideItem = (props) => {
  const {
    imagePath,
    name,
    profession,
    rating,
    catrgoryType,
    textColor,
    descriptionTextColor
  } = props;

  return (
    <Flex
      cursor="pointer"
      w="300px"
      minWidth="300px"
      direction="column"
      mr="30px"
    >
      <Flex className={styles.image_wrapper}>
        <Image className={styles.main_image} src={imagePath} />
        <Flex className={styles.hover_block}>
          <Image src="/images/sections/categoriesPreviewSlider/hover_image.svg" />
          {getFormattedHeading(
            'Zostań ekspertem na platformie',
            2,
            false,
            {
              marginBottom: '30px',
              fontSize: '1.6rem',
              lineHeight: 1.2,
              textAlign: 'left',
              color: '#fff'
            },
            { fontWeight: '600', color: '#fff' }
          )}
          <Button
            h="50px"
            w="120px"
            bg="general.sand"
            borderRadius="48px"
            fontSize="0.75rem"
            lineHeight="34px"
            color="general.dark"
            p="19px 32px"
          >
            Zarejestruj się
          </Button>
        </Flex>
      </Flex>
      <Box p={{ sm: '20px 5px', xl: '41px' }}>
        <Flex direction="column">
          <Flex mb="18px">
            <Avatar
              src="/images/sections/categoriesPreviewSlider/Avatar.svg"
              mr="25px"
            />
            <Box>
              <Text
                fontSize="0.8rem"
                fontWeight="400"
                color={textColor ? textColor : 'general.white'}
              >
                {name}
              </Text>
              <Text
                fontSize="0.8rem"
                fontWeight="600"
                color={textColor ? textColor : 'general.white'}
              >
                {profession}
              </Text>
            </Box>
          </Flex>
          <Flex align="center">
            <StarRatings
              rating={Number(rating) || 1}
              starDimension="22px"
              starRatedColor="#F7D39B"
              starEmptyColor="#D9DBE9"
              starSpacing="2px"
              numberOfStars={5}
              name="rating"
              svgIconViewBox="0 0 20 21"
              widgetSpacings="2px"
              widgetDimension="2px"
              svgIconPath="M9.30788 0.657971C9.56452 0.0432001 10.4355 0.0431999 10.6921 0.657971L12.8937 5.93186C12.9963 6.17755 13.2214 6.35045 13.4852 6.38616L19.2876 7.17148C19.9378 7.25948 20.1695 8.08097 19.6612 8.49579L15.1809 12.1518C14.9594 12.3326 14.86 12.6235 14.9244 12.902L16.3568 19.0919C16.5119 19.762 15.7583 20.27 15.1953 19.8748L10.4309 16.5309C10.1723 16.3494 9.82771 16.3494 9.56914 16.5309L4.8047 19.8749C4.24167 20.27 3.48807 19.7621 3.64315 19.0919L5.07545 12.902C5.1399 12.6235 5.04042 12.3326 4.81895 12.1518L0.338802 8.49578C-0.169523 8.08096 0.0622221 7.25948 0.712396 7.17149L6.51479 6.38616C6.77862 6.35045 7.00375 6.17755 7.10631 5.93186L9.30788 0.657971Z"
            />
            <Text
              w={{ sm: '35%' }}
              pt="5px"
              fontSize="0.6rem"
              ml="10px"
              color="#4E4B66"
              fontWeight="600"
            >
              <b>4</b>(1,256){' '}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Box w="100%" h="2px" bg="#3D3D50" mb="20px">
        <Box w="25%" h="2px" bg="#7A72DF" />
      </Box>
      <Heading
        pl="41px"
        fontSize="1.1rem"
        fontWeight="400"
        color={descriptionTextColor ? descriptionTextColor : 'general.white'}
      >
        {catrgoryType}
      </Heading>
    </Flex>
  );
};

export default SlideItem;

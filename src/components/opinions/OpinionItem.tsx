import { Flex, Avatar, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { initialStateType } from '../../redux/interfaces/app';
import { screenSizesNumber } from '../../styles/theme/breakpoints';
import { ArrowSeparator } from './ArrowSeparator';

const Opinion = (props) => {
  const {
    client,
    description,
    rating,
    createdAt,
    index,
    isShouldShowAllStars
  } = props;

  const router = useRouter();
  const { publicName, avatarUrl } = client;

  const onClientClick = (id: number) => {
    router.push(
      '/[locale]/profile/[uuid]/',
      `/${router.query.locale}/profile/${id}/`
    );
  };

  const postDate = useMemo(() => createdAt.split('T')[0], [createdAt]);

  return (
    <Flex
      w="100%"
      //w={`${index ? 100 - index * 4 - 1 : 100}%`}
      mb="40px"
      //ml={`${index ? index * 2 - 1 : 0}%`}
      direction="column"
      bg="general.grayViolet"
      borderRadius="5px"
    >
      <Flex p="50px 40px 35px">
        <Avatar
          cursor="default"
          // onClick={() => onClientClick(client.id)}
          mr="20px"
          src={avatarUrl}
          alt="Reviewer profile photo"
        />
        <Flex
          cursor="default"
          // onClick={() => onClientClick(client.id)}
          direction="column"
          mr="53px"
        >
          {publicName && <Text fontSize="0.8rem">{publicName}</Text>}
          {/* {profesion && <Text fontWeight="600">{profesion}</Text>} */}
        </Flex>
        {rating && (
          <Flex align="center">
            {/* <Image
              w={{ lg: '35px', xl: '45px' }}
              h={{ lg: '35px', xl: '45px' }}
              mr="15px"
              src="/images/sections/offer/Star.svg"
            /> */}
            <StarRatings
              rating={Number(rating)}
              starDimension="22px"
              starRatedColor="#F7D39B"
              starEmptyColor="#D9DBE9"
              starSpacing="2px"
              numberOfStars={isShouldShowAllStars ? 5 : 1}
              name="rating"
              svgIconViewBox="0 0 20 21"
              widgetSpacings="2px"
              widgetDimension="2px"
              svgIconPath="M9.30788 0.657971C9.56452 0.0432001 10.4355 0.0431999 10.6921 0.657971L12.8937 5.93186C12.9963 6.17755 13.2214 6.35045 13.4852 6.38616L19.2876 7.17148C19.9378 7.25948 20.1695 8.08097 19.6612 8.49579L15.1809 12.1518C14.9594 12.3326 14.86 12.6235 14.9244 12.902L16.3568 19.0919C16.5119 19.762 15.7583 20.27 15.1953 19.8748L10.4309 16.5309C10.1723 16.3494 9.82771 16.3494 9.56914 16.5309L4.8047 19.8749C4.24167 20.27 3.48807 19.7621 3.64315 19.0919L5.07545 12.902C5.1399 12.6235 5.04042 12.3326 4.81895 12.1518L0.338802 8.49578C-0.169523 8.08096 0.0622221 7.25948 0.712396 7.17149L6.51479 6.38616C6.77862 6.35045 7.00375 6.17755 7.10631 5.93186L9.30788 0.657971Z"
            />

            <Text ml="20px" fontSize="0.6rem" fontWeight="600">
              {rating}
            </Text>
          </Flex>
        )}
      </Flex>
      <ArrowSeparator />
      <Flex direction="column" mt="30px" p="30px 10%">
        {description && (
          <Text mb="31px" fontSize="0.8rem">
            {description}
          </Text>
        )}
        {postDate && (
          <Text fontSize="0.6rem" color="general.smallText">
            {postDate}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export const OpinionItem = (props) => {
  const { reviews } = props;

  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );

  const isShouldShowAllStars = useMemo((): boolean => {
    return windowWidth >= screenSizesNumber.lg;
  }, [windowWidth]);

  if (!reviews) {
    return (
      <Flex w="100%" direction="column" mb="30px">
        {/* <Opinion {...props} /> */}
        <Flex align="flex-end" direction="column" pl="0%" pt="38px">
          <Opinion {...props} isShouldShowAllStars={isShouldShowAllStars} />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" mb="60px" fontSize="0.8rem">
      {/* <Opinion {...props} /> */}
      {reviews && reviews.length ? (
        <Flex align="flex-end" direction="column" pl="0%" pt="38px">
          {reviews.map((i, index) => (
            <Opinion
              {...i}
              index={index}
              isShouldShowAllStars={isShouldShowAllStars}
            />
          ))}
        </Flex>
      ) : (
        'No comments yet...'
      )}
    </Flex>
  );
};

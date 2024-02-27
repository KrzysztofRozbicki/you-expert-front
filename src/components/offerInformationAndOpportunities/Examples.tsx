import { useState } from 'react';
import { Flex, Image } from '@chakra-ui/react';
import CarouselController from '../common/CarouselController';
import VideoController from '../common/VideoController';
import { getImagePath } from '../../common/strings';

interface slideItem {
  imageUrl?: string;
  indexValue: number;
  type: string;
  videoUrl?: string;
}

export const Examples = ({
  sliderExampleItems,
  sliderWrapperStyles,
  prevArrow,
  nextArrow
}) => {
  const [sliderAutoplay, setAutoplay] = useState(true);

  const onVideoClick = () => {
    setAutoplay(!sliderAutoplay);
  };

  const renderSliderContent = (items: slideItem[]) => {
    const formattedItems = items.filter((i) => i.imageUrl || i.videoUrl);
    return formattedItems.map((item, itemIndex) => {
      const { type, videoUrl, imageUrl } = item;

      if (type === 'video') {
        return (
          <Flex
            w="100%"
            m={{ lg: '0', xl: '70px auto' }}
            key={`example-${itemIndex}`}
            overflow="hidden"
          >
            <a
              href={videoUrl}
              target="_blank"
              style={{ width: '100%', height: '100%' }}
            >
              <VideoController
                h="500px"
                url={videoUrl}
                onClick={onVideoClick}
              />
            </a>
            <Flex opacity="0" h="1px">
              {itemIndex}
            </Flex>
          </Flex>
        );
      }

      return (
        <Flex
          w="100%"
          m={{ lg: '0', xl: '70px auto' }}
          height='362px'
          key={`example-${itemIndex}`}
          overflow="hidden"
        >
          <a
            href={imageUrl}
            target="_blank"
            style={{ width: '100%', height: '100%' }}
          >
            <Image
              src={imageUrl}
              width="100%"
              height="100%"
              objectFit="cover"
              margin='0 auto'
            />
          </a>
          <Flex opacity="0" h="1px">
            {itemIndex}
          </Flex>
        </Flex>
      );
    });
  };

  return (
    <Flex style={sliderWrapperStyles} position="relative" maxWidth="100%">
      <CarouselController
        infinite={true}
        slidesToShow={1}
        // autoplay={sliderAutoplay}
        prevArrow={prevArrow || <></>}
        nextArrow={nextArrow || <></>}
      >
        {renderSliderContent(sliderExampleItems)}
      </CarouselController>
    </Flex>
  );
};

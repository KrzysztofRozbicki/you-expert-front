import { memo } from 'react';
import { Flex, Button, Image, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TagItem } from './Interfaces/index';

const renderPopularTags = (tagsList: TagItem[], onClick: Function) => {
  return tagsList.map((tag, tagIndex) => {
    const { id, name, slug, label } = tag;
    const isActive = tagIndex === 1;
    if (isActive) {
      return (
        <Button
          key={`${id}-${tagIndex + 1}`}
          border="2px solid #EC8581"
          borderRadius="20px"
          color="#EC8581"
          bg="transparent"
          mr="15px"
          p="20px"
          fontSize='0.8rem'
          _hover={{
            backgroundColor: 'transparent'
          }}
          onClick={() => onClick(slug)}
        >
          {name || label}
        </Button>
      );
    }

    return (
      <Button
        key={`${id}-${tagIndex + 1}`}
        border="2px solid #62628C"
        borderRadius="20px"
        color="#62628C"
        bg="transparent"
        mr="15px"
        p="20px"
        fontSize='0.8rem'
        _hover={{
          backgroundColor: 'transparent'
        }}
        onClick={() => onClick(slug)}
      >
        {name || label}
      </Button>
    );
  });
};

const TagsController = (props) => {
  return null;
  const { label, tagsData, hasImage, titleStyle, wrapperStyle } = props;
  const router = useRouter();

  const onTagClick = (slug: string) => {
    if (slug) {
      router.push(
        '/[locale]/categories/[category]/offers/',
        `/${router.query.locale}/categories/${slug}/offers/`
      );
    }
  };

  return (
    <Flex style={wrapperStyle} direction="column" pl="20px">
      <Flex mb={hasImage && label ? '30px' : '0'} align="center">
        {hasImage && (
          <Image
            mr="27px"
            src="/images/sections/search/Tag.svg"
            alt="Tag icon"
          />
        )}
        {label && (
          <Heading
            style={titleStyle}
            fontSize="0.8rem"
            fontWeight="400"
            color="general.white"
          >
            {label}
          </Heading>
        )}
      </Flex>
      <Flex>{renderPopularTags(tagsData, onTagClick)}</Flex>
    </Flex>
  );
};

export default memo(TagsController);

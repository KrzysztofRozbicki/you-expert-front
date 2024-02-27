import React from 'react';
import { Flex } from '@chakra-ui/react';
import TagsController from '../common/TagsController';
import useTranslation from '../../hooks/useTranslation';
import { TagsComponentProps } from '../../common/interfaceTypes';

interface tag {
  value: string;
  label: string;
}

const tagsData: tag[] = [
  {
    value: 'Branding',
    label: 'Branding'
  },
  {
    value: 'Developer',
    label: 'Developer'
  },
  {
    value: 'Web and Mobile Design',
    label: 'Web and Mobile Design'
  }
];

export const PopularTags: React.FC<TagsComponentProps> = ({
  hideTitle,
  tagsDataList,
  wrapperStyle,
  customStyle
}) => {
  const { t } = useTranslation();

  return (
    <Flex style={customStyle} w="90%" m="0 auto">
      <TagsController
        wrapperStyle={wrapperStyle || { padding: '61px 0 0' }}
        tagsData={tagsDataList || tagsData}
        label={hideTitle ? '' : t('offer', 'relatedTags', 'title')}
        titleStyle={{ fontSize: '1.6rem', fontWeight: '500', color: '#020055' }}
      />
    </Flex>
  );
};

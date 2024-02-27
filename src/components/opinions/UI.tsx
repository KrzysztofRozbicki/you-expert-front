import { memo } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import useTranslation from '../../hooks/useTranslation';
import { OpinionItem } from './OpinionItem';
import { Opinion } from './common';
import SectionWrapper from '../common/SectionWrapper';

const UI = (props) => {
  const { t } = useTranslation();
  const { content } = props;
  const renderOpinionList = (items: Opinion[]) => {
    return items.map((i) => <OpinionItem {...i} />);
  };

  return (
    <SectionWrapper>
      <Flex
        pt="36px"
        direction="column"
        w={{ sm: '100%', lg: '65%' }}
        pb={{ sm: '50px', lg: '80px' }}
        borderBottom="4px solid #DCDCF4"
      >
        <Heading fontSize="1.6rem" fontWeight="500" mb="45px">
          {t('offer', 'opinions', 'title')}
        </Heading>
        <Flex flexWrap="wrap">
          {!content || !content.length ? (
            <Text fontSize="0.8rem">
              {t('offer', 'opinions', 'noOpinions')}
            </Text>
          ) : (
            renderOpinionList(content)
          )}
        </Flex>
      </Flex>
    </SectionWrapper>
  );
};

export default memo(UI);

import { memo, useMemo } from 'react';
import { Flex, List, ListItem, Heading, Text, Image } from '@chakra-ui/react';
import { DescriptionItem, wrapperStyle } from './common';
import SectionWrapper from '../common/SectionWrapper';
import DividerController from '../common/DividerController';

const UI = (props) => {
  const { description } = props;

  if (!description || !description.length) return null;

  const clearDescription = useMemo((): string => {
    try {
      return description
        ?.replace(/(<([^>]+)>)/gi, '')
        ?.replace(/\\n/g, '<br />');
    } catch {
      return '';
    }
  }, [description]);

  const renderContent = (items: DescriptionItem[]) => {
    return (
      <Flex
        w={{ lg: '60%', xl: '65%' }}
        direction="column"
        pl="10%"
        borderBottom="4px solid #DCDCF4"
      >
        {items.map((item) => {
          const { title, description, options } = item;
          return (
            <Flex direction="column" w="65%" mb="78px">
              <Heading
                fontSize="36px"
                fontWeight="500"
                lineHeight="46px"
                maxWidth="565px"
                mb={{ xl: '43px' }}
              >
                {title}
              </Heading>

              <Text maxWidth="826px" mb="67px">
                {description}
              </Text>

              <List>
                {options.map((option) => {
                  return (
                    <ListItem key={option.slice(0, 10)} mb="20px">
                      <Flex align="center">
                        <Image
                          p="18px"
                          border="2px solid rgba(32, 14, 36, 0.2)"
                          borderRadius="100%"
                          src="/images/common/Check.svg"
                          mr="26px"
                        />
                        <Text>{option}</Text>
                      </Flex>
                    </ListItem>
                  );
                })}
              </List>
            </Flex>
          );
        })}
      </Flex>
    );
  };

  return (
    <SectionWrapper customStyle={wrapperStyle}>
      <Flex direction="column" w={{ sm: '100%', lg: '60%' }}>
        {description ? (
          <Text
            fontSize="0.8rem"
            dangerouslySetInnerHTML={{ __html: clearDescription }}
          />
        ) : (
          'Missing description'
        )}
        {/* {renderContent(content)} */}
      </Flex>
      <Flex w={{ sm: '100%', lg: '60%' }}>
        <DividerController customM={{ sm: '39px 0 0 0', lg: '59px 0 0 0' }} />
      </Flex>
    </SectionWrapper>
  );
};

export default memo(UI);

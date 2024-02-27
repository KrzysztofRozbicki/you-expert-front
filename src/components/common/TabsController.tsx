import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Heading,
  Text,
  Button,
  Tooltip,
  Image
} from '@chakra-ui/react';
import LinkController from '../common/LinkController';
import useTranslation from '../../hooks/useTranslation';

interface itemDescription {
  title: string;
  text: string;
  price: string;
  link: string;
  deliveryDate: number;
  parameterAnswers: any;
}

interface item {
  title: string;
  text: string;
  header: string;
  description: itemDescription;
  isDisabled: boolean;
}

export const TabsController = (props) => {
  const {
    content,
    currency,
    onTabButtonClick,
    isMyOwnOffer,
    onEditOfferButtonClick,
    onDeleteOfferButtonClick
  } = props;

  const { t } = useTranslation();

  const renderTabsHeaders = (items: item[]) => {
    return items.map((item) => {
      const { header, isDisabled } = item;
      if (isDisabled) {
        return (
          <Tooltip
            hasArrow
            label={t('offerDetails', 'tabsHeader', 'headerDisabled')}
          >
            <Flex
              width="100%"
              align="center"
              justify="center"
              cursor="no-drop"
              bg="#DBDBDD"
              color="#fff"
              fontWeight="400"
              fontSize="0.8rem"
              h={{ sm: '64px', xl: '84px' }}
              p={{ sm: '1.5%', xl: '2%' }}
              borderRadius="5px 5px 0 0"
            >
              {t('offerDetails', 'tabsHeader', header)}
            </Flex>
          </Tooltip>
        );
      }

      return (
        <Tab
          width="100%"
          justify="center"
          fontWeight="400"
          fontSize="0.8rem"
          h={{ sm: '64px', xl: '84px' }}
          p={{ sm: '1.5%', xl: '2%' }}
          border="1px solid #DCDCF4"
          borderRadius="5px 5px 0 0"
          _selected={{
            position: 'relative',
            borderRadius: '5px 5px 0 0',
            bg: 'general.white',
            fontWeight: '600',
            fontSize: '0.8rem',
            _after: {
              position: 'absolute',
              bottom: '-2px',
              left: '-1px',
              backgroundColor: '#7A72DF',
              display: 'block',
              content: '""',
              height: '5px',
              width: '101%'
            }
          }}
        >
          {t('offerDetails', 'tabsHeader', header)}
        </Tab>
      );
    });
  };

  const renderParamererAnswer = (answer: string | boolean) => {
    if (typeof answer === 'boolean') {
      return answer
        ? t('common', 'answers', 'yes')
        : t('common', 'answers', 'no');
    }
    return answer;
  };

  const renderTabsContent = (items: item[]) => {
    return items.map((item) => {
      const { description, header, title, text } = item;

      const { price, link, deliveryDate, parameterAnswers } = description;

      const formattedParameterAnswers = parameterAnswers
        ? Object.keys(parameterAnswers)
        : [];

      return (
        <TabPanel p="0">
          <Flex
            p={{ sm: '23px 30px', xl: '43px 58px' }}
            direction="column"
            border="1px solid #DCDCF4"
            pb="62px"
            borderTop="none"
            borderBottom="none"
          >
            {/* <Heading
              fontSize={{ lg: '20px', xl: '24px' }}
              fontWeight="500"
              mb={{ lg: '20px', xl: '32px' }}
            >
              {title}
            </Heading> */}
            {deliveryDate ? (
              <Flex
                mb={{ sm: '7px', xl: '10px' }}
                justifyContent="space-between"
              >
                <Text fontSize="0.8rem" fontWeight="500" mr="10px">
                  {`${t('offerDetails', 'tabsContent', 'deliveryDate')}:`}
                </Text>
                <Text fontSize="0.8rem" fontWeight="500">
                  {`${deliveryDate} ${t('common', 'dates', 'days')}`}
                </Text>
              </Flex>
            ) : null}
            {formattedParameterAnswers && formattedParameterAnswers.length ? (
              <Flex direction="column">
                {formattedParameterAnswers.map((key) => (
                  <Flex
                    key={key}
                    mb={{ sm: '7px', xl: '10px' }}
                    justifyContent="space-between"
                  >
                    <Text fontSize="0.8rem" fontWeight="500" mr="10px">
                      {key}
                    </Text>
                    <Text fontSize="0.8rem" fontWeight="500">
                      {renderParamererAnswer(parameterAnswers[key])}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            ) : null}
            {/* <Text>{text}</Text> */}
          </Flex>
          <Flex
            justifyContent="center"
            border="1px solid #DCDCF4"
            borderRadius="0 0 5px px"
            align="center"
            p={{ sm: '20px 5%', xl: '32px 10%' }}
            mt="-2px"
          >
            {!isMyOwnOffer ? (
              <Button
                disabled={!price ? true : false}
                onClick={() => onTabButtonClick(header)}
                bg="general.orange"
                minWidth="55%"
                minHeight={{ sm: '55px', xl: '72px' }}
                mb="15px"
                color="general.white"
                fontWeight="600"
                fontSize="0.8rem"
                p={{ sm: '8px 26px !important', xl: '19px 32px !important' }}
              >
                {`${t('offerDetails', 'tabsContent', 'buttonPriceLabel')} ${
                  price || 0
                } ${currency ? currency : 'PLN'}`}
              </Button>
            ) : (
              <>
                <Button
                  onClick={onDeleteOfferButtonClick}
                  background='general.orange'
                  color="#fff"
                  minWidth='45%'
                  minHeight={{ sm: '55px', xl: '72px' }}
                  mb="15px"
                  mr='10px'
                  fontWeight="600"
                  fontSize="0.8rem"
                  p={{ sm: '8px 26px !important', xl: '19px 32px !important' }}
                >
                  {t('common', 'labels', 'delete')}
                </Button>
                <Button
                  onClick={onEditOfferButtonClick}
                  variant="yellow"
                  color="#000"
                  minWidth='45%'
                  minHeight={{ sm: '55px', xl: '72px' }}
                  mb="15px"
                  fontWeight="600"
                  fontSize="0.8rem"
                  p={{ sm: '8px 26px !important', xl: '19px 32px !important' }}
                >
                  <Image
                    w="15px"
                    mr="10px"
                    cursor="pointer"
                    src="/images/common/pen.png"
                  />
                  {t('common', 'labels', 'edit')}
                </Button>
              </>
            )}
          </Flex>
        </TabPanel>
      );
    });
  };

  if (!content || !content.length) return null;

  return (
    <Tabs>
      <TabList bg="#FBFBFD">{renderTabsHeaders(content)}</TabList>

      <TabPanels>{renderTabsContent(content)}</TabPanels>
    </Tabs>
  );
};

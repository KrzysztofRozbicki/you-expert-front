import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Heading, Flex, Box, Text, Spinner } from '@chakra-ui/react';
import UserProfileSection from '../../../../components/userProfileSection';
import ProfileActionsBlock from '../../../../components/profileActionsBlock';
import useTranslation from '../../../../hooks/useTranslation';
import DateController from '../../../../components/common/dateController';
import { getBalance } from '../../../../api/account';

const UI: React.FC = () => {
  const { t } = useTranslation();
  const { fullProfileData } = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [balanceData, setBalanceData] = useState<any>(null);
  const [dates, setDates] = useState<{ fromDate: string; toDate: string }>({
    fromDate: '',
    toDate: ''
  });

  const getBalanceData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getBalance(fullProfileData?.id, {
        start_date: dates?.fromDate
          ? new Date(dates?.fromDate).getTime() / 1000
          : undefined,
        end_date: dates?.toDate
          ? new Date(dates?.toDate).getTime() / 1000
          : undefined
      });

      if (res?.data) {
        setBalanceData(res?.data);
      }
    } catch (e) {
      setBalanceData(null);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [fullProfileData?.id, dates]);

  const handleChangeDate = useCallback(
    (date: string, dateType: 'fromDate' | 'toDate') => {
      setDates((prev) => ({ ...prev, [dateType]: date }));
    },
    []
  );

  useEffect(() => {
    getBalanceData();
  }, [fullProfileData?.id, dates]);

  return (
    <Flex
      w="100%"
      direction={{ sm: 'column', lg: 'row' }}
      m="50px auto 137px auto"
    >
      <Flex
        w={{ sm: '100%', lg: '35%' }}
        direction={{ sm: 'column-reverse', md: 'column' }}
      >
        <UserProfileSection />
        <Box>
          <ProfileActionsBlock currentAction="balance" />
        </Box>
      </Flex>
      <Flex
        p="5%"
        flexDirection="column"
        flex={1}
        ml={{ lg: '50px' }}
        borderRadius="5px"
        border="1px solid #DCDCF4"
      >
        <Heading fontSize="1.6rem" fontWeight="500" mb="30px">
          {t('dashboard', 'title', 'balance')}
        </Heading>
        <Flex
          mb="30px"
          alignItems={{ sm: 'flex-start', md: 'center' }}
          flexDirection={{ sm: 'column', md: 'row' }}
        >
          <Flex
            mr={{ sm: '0', md: '20px' }}
            mb={{ sm: '10px', md: '0' }}
            alignItems="center"
          >
            <Text
              mr="10px"
              minW={{ sm: '50px', md: 'initial' }}
              textAlign="end"
              fontSize="0.8rem"
            >
              {t('common', 'dates', 'from')}:
            </Text>
            <Flex w="200px">
              <DateController
                value={dates.fromDate}
                onChange={(date: string) => handleChangeDate(date, 'fromDate')}
                maxDate={dates?.toDate}
              />
            </Flex>
          </Flex>
          <Flex alignItems="center">
            <Text
              mr="10px"
              minW={{ sm: '50px', md: 'initial' }}
              textAlign="end"
              fontSize="0.8rem"
            >
              {t('common', 'dates', 'to')}:
            </Text>
            <Flex w="200px">
              <DateController
                value={dates.toDate}
                onChange={(date: string) => handleChangeDate(date, 'toDate')}
                minDate={dates?.fromDate}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex fontSize="18px" w="100%" flexDirection="column">
          {!balanceData || isLoading ? (
            <Spinner />
          ) : (
            <>
              <Flex
                pb="10px"
                mb="22px"
                justifyContent="space-between"
                borderBottom="1px solid #DCDCF4"
              >
                <Text fontSize="0.8rem">
                  {t('dashboard', 'balanceLabel', 'amountOwn')}
                </Text>
                <Text
                  fontWeight="600"
                  fontSize="0.8rem"
                >{`${balanceData?.pendingFunds} pln`}</Text>
              </Flex>
              <Flex
                pb="10px"
                mb="22px"
                justifyContent="space-between"
                borderBottom="1px solid #DCDCF4"
              >
                <Text fontSize="0.8rem">
                  {t('dashboard', 'balanceLabel', 'amountPaid')}
                </Text>
                <Text
                  fontWeight="600"
                  fontSize="0.8rem"
                >{`${balanceData?.withdrawnFunds} pln`}</Text>
              </Flex>
              <Flex
                pb="10px"
                mb="22px"
                justifyContent="space-between"
                borderBottom="1px solid #DCDCF4"
              >
                <Text fontSize="0.8rem">
                  {t('dashboard', 'balanceLabel', 'totalEarnings')}
                </Text>
                <Text
                  fontWeight="600"
                  fontSize="0.8rem"
                >{`${balanceData?.totalFunds} pln`}</Text>
              </Flex>
              <Flex
                pb="10px"
                mb="22px"
                justifyContent="space-between"
                borderBottom="1px solid #DCDCF4"
              >
                <Text fontSize="0.8rem">
                  {t('dashboard', 'balanceLabel', 'onHold')}
                </Text>
                <Text
                  fontWeight="600"
                  fontSize="0.8rem"
                >{`${balanceData?.frozenFunds} pln`}</Text>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UI;

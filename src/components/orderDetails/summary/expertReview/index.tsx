import React, { memo, useMemo, useState, useCallback } from 'react';
import { Flex, useToast, Text, Box } from '@chakra-ui/react';
import useTranslation from '../../../../hooks/useTranslation';
import { ButtonController } from '../../../common/ButtonController';
import { setExpertReviewAction, acceptOrderAction } from '../../actions';
import { orderDetailsDataType } from '../../interfaces';
import {
  WrapperStyled,
  TitleStyled,
  TextStyled,
  TextareaStyles
} from './style';

interface ExpertReviewProps {
  closeCallback: () => void;
  data: orderDetailsDataType;
}

interface ExpertReviewState {
  values: {
    stars: number;
    review: string;
  };
  errors: {
    stars: boolean;
    review: boolean;
  };
}

const ExpertReview: React.FC<ExpertReviewProps> = (props) => {
  const { closeCallback, data } = props;
  const { t } = useTranslation();
  const toast = useToast();
  const renderStart = useMemo(() => new Array(5).fill((_, i) => i + 1), []);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<ExpertReviewState>({
    values: { stars: 0, review: '' },
    errors: { stars: false, review: false }
  });

  const handleChangeStars = useCallback(
    (star: number): void => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, stars: star },
        errors: { ...prev.errors, stars: false }
      }));
    },
    [state]
  );

  const handleChangeReview = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const {
        target: { value }
      } = e;

      setState((prev) => ({
        ...prev,
        values: { ...prev.values, review: value },
        errors: { ...prev.errors, review: false }
      }));
    },
    [state]
  );

  const handleSubmitClick = useCallback((): void => {
    if (!state.values.stars) {
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, stars: true }
      }));
      return;
    }

    if (!isLoading) {
      setIsLoading(true);
      // setExpertReviewAction({
      //   rating: state.values.stars,
      //   description: state.values.review,
      //   to_user: data.expertData.id
      // })
      acceptOrderAction(data.id, {
        rating: state.values.stars,
        description: state.values.review
      })
        .then(() => {
          toast({
            title: t('orderDetails', 'toast', 'solutionWasAccepted'),
            description: t(
              'orderDetails',
              'toast',
              'solutionWasAcceptedWithSuccess'
            ),
            status: 'success',
            duration: 4000,
            isClosable: true
          });

          if (closeCallback) {
            closeCallback();
          }
        })
        .catch(() => {
          toast({
            title: t('orderDetails', 'toast', 'solutionWasntAccepted'),
            description: t('orderDetails', 'toast', 'smthWentWrong'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [data, state, isLoading, closeCallback, t]);

  return (
    <WrapperStyled>
      <TitleStyled>
        {t('orderDetails', 'expertReview', 'approveExpertSolution')}
      </TitleStyled>
      <TextStyled>
        {t(
          'orderDetails',
          'expertReview',
          'doYouWantToConfirmThatTheServiceWasDeliveredByTheExpert'
        )}
      </TextStyled>
      <Box mb="20px">
        <Flex>
          {renderStart.map((item, index) => (
            <Flex
              mr="5px"
              key={index}
              cursor="pointer"
              onClick={() => handleChangeStars(index + 1)}
            >
              <svg viewBox="0 0 20 21" width="22px" height="22px">
                <path
                  d="M9.30788 0.657971C9.56452 0.0432001 10.4355 0.0431999 10.6921 0.657971L12.8937 5.93186C12.9963 6.17755 13.2214 6.35045 13.4852 6.38616L19.2876 7.17148C19.9378 7.25948 20.1695 8.08097 19.6612 8.49579L15.1809 12.1518C14.9594 12.3326 14.86 12.6235 14.9244 12.902L16.3568 19.0919C16.5119 19.762 15.7583 20.27 15.1953 19.8748L10.4309 16.5309C10.1723 16.3494 9.82771 16.3494 9.56914 16.5309L4.8047 19.8749C4.24167 20.27 3.48807 19.7621 3.64315 19.0919L5.07545 12.902C5.1399 12.6235 5.04042 12.3326 4.81895 12.1518L0.338802 8.49578C-0.169523 8.08096 0.0622221 7.25948 0.712396 7.17149L6.51479 6.38616C6.77862 6.35045 7.00375 6.17755 7.10631 5.93186L9.30788 0.657971Z"
                  fill={index + 1 <= state.values.stars ? '#F7D39B' : '#D9DBE9'}
                />
              </svg>
            </Flex>
          ))}
        </Flex>
        {state.errors.stars && (
          <Text fontSize="0.6rem" color="general.red">
            {t('orderDetails', 'expertReview', 'stars')}{' '}
            {t('settings', 'errors', 'isRequired')}
          </Text>
        )}
      </Box>
      <Flex mb="20px">
        <TextareaStyles
          value={state.values.review}
          onChange={handleChangeReview}
          placeholder={t(
            'orderDetails',
            'expertReview',
            'pleaseWriteAReviewForThisExpert'
          )}
        />
      </Flex>
      <Flex justifyContent="flex-end">
        <ButtonController
          variant="darkPurpul"
          onClick={handleSubmitClick}
          customStyle={{ fontSize: '17px', minHeight: '27px' }}
          isDisabled={isLoading}
        >
          {t('orderDetails', 'expertReview', 'approve')}
        </ButtonController>
      </Flex>
    </WrapperStyled>
  );
};

export default memo(ExpertReview);

import React, { memo, useCallback } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ButtonController } from '../../ButtonController';
import useTranslation from '../../../../hooks/useTranslation';
import { AcceptTermsProps } from '../interfaces';
import { ACCEPTED_TERMS } from './constants';

interface AcceptTermsComponentProps extends AcceptTermsProps {
  onClose: () => void;
}

const AceptTerms: React.FC<AcceptTermsComponentProps> = (props) => {
  const { identificator, onConfirm, onClose } = props;
  const { t } = useTranslation();
  const {
    query: { locale }
  } = useRouter();

  const handleSubmitClick = useCallback(() => {
    try {
      let acceptedTerms: any = localStorage.getItem(ACCEPTED_TERMS);
      if (acceptedTerms) {
        try {
          acceptedTerms = JSON.parse(acceptedTerms);
        } catch (e) {
          console.error(e);
          acceptedTerms = [];
        }
      }

      if (Array.isArray(acceptedTerms)) {
        acceptedTerms.push(identificator);
      } else {
        acceptedTerms = [identificator];
      }

      localStorage.setItem(ACCEPTED_TERMS, JSON.stringify(acceptedTerms));
    } catch (e) {
      console.error(e);
    }

    if (onConfirm) {
      onConfirm();
    }

    onClose();
  }, [onConfirm, onClose, identificator]);

  return (
    <Flex p="30px" flexDirection="column">
      <Text fontSize="1.1rem" mb="20px" textAlign="center" fontWeight="500">
        {t('modals', 'acceptTerms', 'title')}
      </Text>
      <Text fontSize="0.8rem" mb="20px" fontWeight="500" textAlign="center">
        {t('modals', 'acceptTerms', 'text')}{' '}
        <a
          href={`/${locale}/privacy-policy`}
          target="_blank"
          style={{ textDecoration: 'underline' }}
        >
          {t('modals', 'acceptTerms', 'link')}
        </a>
      </Text>
      <Flex justifyContent="center">
        <ButtonController
          variant="yellow"
          onClick={onClose}
          customStyle={{
            fontSize: '0.8rem',
            minHeight: '27px',
            marginRight: '20px'
          }}
        >
          {t('modals', 'acceptTerms', 'cancel')}
        </ButtonController>
        <ButtonController
          variant="yellow"
          onClick={handleSubmitClick}
          customStyle={{ fontSize: '0.8rem', minHeight: '27px' }}
        >
          {t('modals', 'acceptTerms', 'accept')}
        </ButtonController>
      </Flex>
    </Flex>
  );
};

export default memo(AceptTerms);

import { Flex, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ActionItemProps } from './common';
import useTranslation from '../../hooks/useTranslation';

const ActionItem: React.FC<ActionItemProps> = ({
  actionType,
  isActive,
  onClick,
  path
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Flex
      cursor="pointer"
      p={{ sm: '5px 0', md: '5px 0', lg: '5px 0', xl: '7px 0' }}
      color="general.link"
      fontWeight="500"
      fontSize='1.33rem'
      onClick={() => onClick(actionType, path, router.asPath)}
      flexDirection='column'
    >
      {t('dashboard', 'title', actionType)}
      <Box position="relative" height="3.5px" w="100%" background="#DCDCF4">
        {isActive && (
          <Box
            top="0"
            left="0"
            bottom="0"
            w="30%"
            position="absolute"
            zIndex={1}
            background="#7A72DF"
          />
        )}
      </Box>
    </Flex>
  );
};

export default ActionItem;

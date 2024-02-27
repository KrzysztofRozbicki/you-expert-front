import React, { memo, useCallback, useState, useMemo, useEffect } from 'react';
import { Flex, Input } from '@chakra-ui/react';
import useTranslation from '../../../hooks/useTranslation';
import DialogItem from './dialogItem';
import { IDialogs, IDialogItem } from '../interfaces';

interface DialogsProps {
  search: string;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectDialog: (dialog: IDialogItem) => void;
  dialogs: IDialogs;
  selectedDialog: IDialogItem;
}

const Dialogs: React.FC<DialogsProps> = (props) => {
  const {
    search,
    dialogs,
    handleChangeSearch,
    onSelectDialog,
    selectedDialog
  } = props;
  const { t } = useTranslation();

  return (
    <Flex
      h="100%"
      flex={1}
      borderRight="1px solid"
      borderColor="general.tableHeaderBackground"
      flexDirection="column"
      overflow="hidden"
    >
      <Input
        value={search}
        h="60px"
        w="100%"
        padding="20px"
        onChange={handleChangeSearch}
        placeholder={t('inbox', 'dialogs', 'search')}
        border="none"
        fontSize="0.8rem"
        borderBottom="1px solid"
        borderBottomColor="general.greyDisabled"
        borderRadius="0px"
        _focus={{ borderBottomColor: 'general.greyDisabled' }}
        _hover={{ borderBottomColor: 'general.greyDisabled' }}
      />
      <Flex flex={1} overflow="auto" flexDirection="column">
        {dialogs.results.map((dialog, index) => (
          <DialogItem
            key={index}
            dialog={dialog}
            onDialogClick={() => onSelectDialog(dialog)}
            isSelected={selectedDialog?.id === dialog?.id}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default memo(Dialogs);

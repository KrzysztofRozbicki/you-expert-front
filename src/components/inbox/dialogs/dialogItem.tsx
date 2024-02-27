import React, { memo, useMemo } from 'react';
import { Flex, Avatar, Text } from '@chakra-ui/react';
import { IDialogItem } from '../interfaces';
import { getFullDate } from '../../../utils';

interface DialogItemProps {
  dialog: IDialogItem;
  onDialogClick: () => void;
  isSelected: boolean;
}

const DialogItem: React.FC<DialogItemProps> = (props) => {
  const { dialog, onDialogClick, isSelected } = props;

  const lastMessageText = useMemo((): string => {
    if (dialog?.lastMessage?.file) {
      let index = dialog.lastMessage.file?.name.lastIndexOf('/');
      if (index === -1) {
        return dialog.lastMessage.file?.name;
      }

      return dialog.lastMessage.file?.name.slice(index + 1);
    }

    return dialog?.lastMessage?.text;
  }, [dialog]);

  return (
    <Flex
      w="100%"
      minHeight="90px"
      padding="20px"
      overflow="hidden"
      borderBottom="1px solid"
      borderColor="general.tableHeaderBackground"
      cursor="pointer"
      onClick={onDialogClick}
      bg={isSelected ? 'general.tableHeaderBackground' : '#fff'}
    >
      <Avatar
        src={dialog?.dialogWith?.avatarUrl}
        name={dialog?.dialogWith?.publicName}
        size="md"
        mr="10px"
      />
      <Flex flex={1} flexDirection="column" overflow="hidden">
        <Text
          fontWeight="500"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          fontSize="0.8rem"
        >
          {dialog?.dialogWith?.publicName}
        </Text>
        <Flex w="100%" justify="space-between">
          <Text
            fontSize="0.6rem"
            pr="10px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {lastMessageText}
          </Text>
          <Text fontSize="0.6rem" whiteSpace="nowrap">
            {getFullDate(dialog?.lastMessage?.created)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(DialogItem);

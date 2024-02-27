import { List, ListItem } from '@chakra-ui/react';

export interface hint {
  id: number;
  representationFullName: string;
  slug: string;
}

export const renderHintList = (
  items: hint[],
  onSelect: Function,
  customHintsStyle?: Object
) => {
  if (!items || !items.length) return null;

  return (
    <List
      w='100%'
      maxW="570px"
      maxHeight="400px"
      overflowY="scroll"
      position="absolute"
      border="1px solid #DCDCF4"
      borderRadius="5px"
      mt="0px"
      bg="general.white"
      p="20px 0"
      style={customHintsStyle}
    >
      {items.map((item, itemIndex) => {
        const { id, representationFullName, slug } = item;
        const key = `${slug}-${itemIndex}-${id}`;

        return (
          <ListItem
            key={key}
            fontSize="0.7rem"
            fontWeight="300"
            display="block"
            cursor="pointer"
            color="#020055"
            borderBottom="1px solid #DCDCF4"
            borderRadius="0"
            padding="10px 18px"
            margin="10px 10px 10px 0"
            onClick={() => onSelect(representationFullName, slug)}
          >
            {representationFullName}
          </ListItem>
        );
      })}
    </List>
  );
};

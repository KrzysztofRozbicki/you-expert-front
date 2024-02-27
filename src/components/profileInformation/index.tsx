import { UI } from './UI';

const ProfileInformation = (props) => {
  const { onContactClick } = props;

  const onQuoteClick = () => {
    return null;
  };

  return (
    <UI
      {...props}
      onContactClick={onContactClick}
      onQuoteClick={onQuoteClick}
    />
  );
};

export default ProfileInformation;

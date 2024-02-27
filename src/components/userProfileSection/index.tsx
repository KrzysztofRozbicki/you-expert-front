import { useSelector } from 'react-redux';
import UI from './UI';
import { UserState } from '../../common/interfaceTypes';

const UserProfileSection = (props) => {
  const { fullProfileData } = useSelector((state: UserState) => state.user);

  return <UI {...fullProfileData} {...props} />;
};

export default UserProfileSection;

// avatarUrl, publicName, title, rating, reviewCount

//"/images/common/ProfileSectionAvatar.png"

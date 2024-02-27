import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, Spinner } from '@chakra-ui/react';
import WithLocale from '../../../../hocs/withLocale';
import useTranslation from '../../../../hooks/useTranslation';
import { TitleWithLine } from '../../../../components/titleWithLine';
import Layout from '../../../../components/layout';
import SectionWrapper from '../../../../components/common/SectionWrapper';
import ProfileInformation from '../../../../components/profileInformation';
import ExpertOffers from '../../../../components/expertOffers';
import { OpinionItem } from '../../../../components/opinions/OpinionItem';
import { triggerAuthModal } from '../../../../redux/actions/app';
import {
  getPublicUserDataById,
  getDialogId,
  getUserDataById
} from '../../../../api/account';

const hardcodedOppinion = {
  name: 'Jurek',
  profesion: 'Graphic Designer',
  rating: 5,
  description:
    "Let's just say myself, family and friends are in tears. The vision for my business to honor the life of my mother and finish what she started was brought to life more than I could have ever imagined!!! I'm beyond joyful!!! Thank you! Thank you! Thank you!",
  postDate: 'Published 1 month ago'
};

const ProfileId = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isContactMeLoading, setIsContactMeLoading] = useState<boolean>(false);
  const { query } = router;
  const { uuid } = query;
  const { t } = useTranslation();

  const {
    profileData: loginedUserProfileData,
    fullProfileData,
    isAuthenticated
  } = useSelector((state: any) => state.user);

  const getCurrentUserData = useCallback(
    async (userId: string | string[]) => {
      try {
        let userResponse;
        if (loginedUserProfileData?.user_id === +userId) {
          userResponse = await getUserDataById(userId);
        } else {
          userResponse = await getPublicUserDataById(userId);
        }

        if (!userResponse?.data?.isExpert) {
          return router.push('/[locale]/404/', `/${router.query.locale}/404/`);
        } else {
          setUserData(userResponse?.data);
          return;
        }
      } catch {
        router.push('/[locale]/404/', `/${router.query.locale}/404/`);
      }
    },
    [router, loginedUserProfileData]
  );

  const onContactMeClick = useCallback(() => {
    if (!isAuthenticated) {
      dispatch(triggerAuthModal(true, 'login'));
      return;
    }

    const {
      push,
      query: { locale }
    } = router;

    setIsContactMeLoading(true);
    getDialogId(userData?.id)
      .then((data: { dialogId: number }) => {
        if (data) {
          push({
            pathname: `/${locale}/dashboard/inbox`,
            query: { dialog: data?.dialogId }
          });
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setIsContactMeLoading(false));
  }, [userData, router, isAuthenticated, dispatch]);

  const isMyProfile = useMemo((): boolean => {
    return fullProfileData?.id === userData?.id;
  }, [fullProfileData, userData]);

  useEffect(() => {
    getCurrentUserData(uuid);
  }, []);

  if (!userData) return null;

  return (
    <>
      <SectionWrapper
        customStyle={{ flexDirection: 'column' }}
        p={{ sm: '75px 0', xl: '100px 0' }}
      >
        <TitleWithLine
          title={t('profile', 'description', 'title')}
          lineStyles={{ width: '70%' }}
        />
        <Flex
          w="100%"
          direction={{ sm: 'column', xl: 'row' }}
          pt={{ sm: '64px', xl: '86px' }}
        >
          <Flex
            direction="column"
            w={{ sm: '100%', lg: '100%', xl: '45%' }}
            mr={{ lg: '20px' }}
          >
            <ProfileInformation
              {...userData}
              isContactMeLoading={isContactMeLoading}
              onContactClick={onContactMeClick}
              isMyProfile={isMyProfile}
            />
            <Flex direction="column">
              <TitleWithLine
                wrapperP={{ sm: '40px 0', lg: '50px 0', xl: '70px 0' }}
                title={t('profile', 'description', 'reviews')}
                lineStyles={{ width: '100%' }}
              />
              <OpinionItem {...userData} {...hardcodedOppinion} />
            </Flex>
          </Flex>
          <Flex
            flex={1}
            m={{ xl: '40px 0 0 20px' }}
            w={{ md: '100%', lg: '100%', xl: '47%' }}
            ml="auto"
          >
            <ExpertOffers
              currentUserId={userData?.uuid}
              profileData={userData}
              logginedUserId={fullProfileData?.uuid}
            />
          </Flex>
        </Flex>
      </SectionWrapper>
    </>
  );
};

const profilePage = () => {
  return (
    <Layout>
      <ProfileId />
    </Layout>
  );
};

export default WithLocale(profilePage);

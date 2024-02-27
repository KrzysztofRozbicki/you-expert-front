import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Spinner, useToast } from '@chakra-ui/react';
import { completeUserEmailConfirm } from '../../../../../api/account';
import Layout from '../../../../../components/layout';

const UserToken = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const checkEmailConfirmation = async (
    id: string | string[],
    token: string | string[],
    locale: string | string[]
  ) => {
    try {
      const result = await completeUserEmailConfirm(id, token);
      if (result.status === 200 || result.status === 204) {
        toast({
          title: 'Email was confirmed.',
          description: "You've confirmed your account, now you can login.",
          status: 'success',
          duration: 4000,
          isClosable: true
        });
        setLoading(false);
        router.push('/[locale]/home', `/${locale}/home`);
      }
    } catch (error) {}
  };
  useEffect(() => {
    const { uid, user_token, locale } = router.query;
    checkEmailConfirmation(uid, user_token, locale);
  }, []);

  if (loading) {
    return (
      <Layout authState="login">
        <Stack direction="row" spacing={4}>
          <Spinner size="xl" />
        </Stack>
      </Layout>
    );
  }
  return null;
};

export default UserToken;

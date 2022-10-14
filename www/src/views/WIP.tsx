import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/Animation/PageTransition';
import SplashScreen from '../components/UI/SplashScreen';

const WIP: FC = () => {
  const { t } = useTranslation('home');

  return (
    <PageTransition initial={false} customVariants={{ displayed: { scale: 1 } }}>
      <SplashScreen justifyContent="center">
        <Stack alignSelf="center" flexDirection="row">
          <Typography>{t('title.wip')}</Typography>
        </Stack>
      </SplashScreen>
    </PageTransition>
  );
};

export default WIP;

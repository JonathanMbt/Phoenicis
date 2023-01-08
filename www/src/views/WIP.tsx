import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/Animation/PageTransition';
import FullScreen from '../components/UI/FullScreen';
import Footer from '../components/Footer';

const WIP: FC = () => {
  const { t } = useTranslation('home');

  return (
    <PageTransition initial={false} customVariants={{ displayed: { scale: 1 } }}>
      {/* <FullScreen justifyContent="center">
        <Stack alignSelf="center" flexDirection="row">
          <Typography>{t('title.wip')}</Typography>
        </Stack>
      </FullScreen> */}
      <Footer />
    </PageTransition>
  );
};

export default WIP;

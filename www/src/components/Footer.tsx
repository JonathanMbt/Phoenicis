import { Button, ButtonGroup, IconButton, Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren, useCallback } from 'react';
import BetterButton from './UI/BetterButton/BetterButton';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation('footer');

  const changeLng = useCallback(async (language: string) => {
    await i18next.changeLanguage(language);
  }, []);

  return (
    <Stack
      flexDirection="row"
      height="15vh"
      minHeight="100px"
      justifyContent={'space-between'}
      sx={{ backgroundColor: '#D4CBBA' }}
      position="absolute"
      left="0"
      right="0"
      bottom="0"
      px={2}
    >
      <Stack flexDirection="column" justifyContent={'center'}>
        <Stack flexDirection="row">
          <img src="/images/logoPhoenicisGame.png" alt="Image" height={30} width={30} />
          <Typography variant="body2">{t('title.corp')}</Typography>
        </Stack>
        <a href="/documents/productys.pdf" download>
          <Typography variant="body2">{t('title.agreements')}</Typography>
        </a>
      </Stack>

      <Stack flexDirection="column" justifyContent={'center'}>
        <Typography variant="body2">{t('title.network')}</Typography>
        <Stack flexDirection="row" justifyContent={'center'}></Stack>
      </Stack>

      <Stack flexDirection="column" justifyContent={'center'}>
        <ButtonGroup size="small" color="inherit" variant="text" orientation="vertical">
          <BetterButton onClick={() => changeLng('fr')}>FR</BetterButton>
          <BetterButton onClick={() => changeLng('en')}>EN</BetterButton>
          <BetterButton onClick={() => changeLng('es')}>ES</BetterButton>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};

export default Footer;

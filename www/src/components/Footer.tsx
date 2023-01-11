import { Button, Box, ButtonGroup, IconButton, Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren, useCallback } from 'react';
import BetterButton from './UI/BetterButton/BetterButton';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import Youtube from '@mui/icons-material/Youtube';
import { Twitter } from '@mui/icons-material';
import phoenicisTheme from './UI/theme';

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
      sx={{ backgroundColor: '#182129' }}
      position="absolute"
      left="0"
      right="0"
      bottom="0"
      px={2}
      color={phoenicisTheme.palette.overlayText.main}
    >
      <Stack flexDirection="column" justifyContent={'center'}>
        <Stack flexDirection="row">
          <img src="/images/logoPhoenicisGame.png" alt="Image" height={30} width={30} />
          <Typography variant="body2">{t('title.corp')}</Typography>
        </Stack>
        <a href="/documents/CGU.pdf" download>
          <Typography variant="body2">{t('title.agreements')}</Typography>
        </a>
      </Stack>
      <Box flexGrow={4} />
      <Stack flexDirection="column" justifyContent={'center'} >
        <Typography variant="body2">{t('title.network')}</Typography>
        <Stack flexDirection="row" justifyContent={'center'}>
          <IconButton component="a" href="https://www.facebook.com/" target="_blank" rel="noreferrer noopener" color='inherit'><FacebookOutlined /></IconButton>
          <IconButton component="a" href="https://www.instagram.com/" target="_blank" rel="noreferrer noopener" color='inherit'><Instagram /></IconButton>
        </Stack>
        <Stack flexDirection="row" justifyContent={'center'}>
          <IconButton component="a" href="https://www.youtube.com/" target="_blank" rel="noreferrer noopener" color='inherit'><Youtube /></IconButton>
          <IconButton component="a" href="https://www.twitter.com/" target="_blank" rel="noreferrer noopener" color='inherit'><Twitter /></IconButton>
        </Stack>
      </Stack>
      <Box flexGrow={5} />
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

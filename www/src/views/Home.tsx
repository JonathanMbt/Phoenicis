import { ButtonGroup, Stack, Typography } from '@mui/material';
import { FC, useCallback } from 'react';
import ComeAndGo from '../components/Animation/ComeAndGo';
import PageTransition from '../components/Animation/PageTransition';
import Arrow from '../components/UI/Arrow/Arrow';
import BetterButton from '../components/UI/BetterButton/BetterButton';
import '../assets/css/default.css';
import i18next from 'i18next';
import FullScreen from '../components/UI/FullScreen';
import phoenicisTheme from '../components/UI/theme';

const Home: FC = () => {
  const changeLng = useCallback(async (language: string) => {
    await i18next.changeLanguage(language);
  }, []);

  return (
    <PageTransition>
      <FullScreen
        sx={{
          backgroundImage: 'url(/demo_map.jpg)',
          backgroundSize: '100%',
        }}
      >
        <FullScreen
          sx={(theme) => ({
            background: theme.palette.overlay.main,
            backdropFilter: 'blur(4px)',
          })}
        >
          <Stack
            alignSelf="center"
            flexDirection="column"
            justifyContent="flex-end"
            flexGrow={0.25}
          >
            <Typography variant="h1" color={phoenicisTheme.palette.overlayText.main}>
              Forgotten Shores
            </Typography>
          </Stack>
          <Stack alignSelf="center" flexDirection="column" flexGrow={1} justifyContent="center">
            <Typography variant="body1" color={phoenicisTheme.palette.overlayText.main}>Lorem Ipsum Piratus Coconuts</Typography>
          </Stack>
          <Stack alignSelf="center" flexDirection="column" flexGrow={0.75}>
            <BetterButton to="WIP" size="large" FramerAnimation={ComeAndGo}>
              <Arrow color={phoenicisTheme.palette.overlayText.main} />
            </BetterButton>
          </Stack>
          <Stack position="absolute" flexDirection="row" left={20} bottom={20}>
            <ButtonGroup size="small" color="overlayText" variant="text">
              <BetterButton onClick={() => changeLng('fr')}>FR</BetterButton>
              <BetterButton onClick={() => changeLng('en')}>EN</BetterButton>
              <BetterButton onClick={() => changeLng('es')}>ES</BetterButton>
            </ButtonGroup>
          </Stack>
        </FullScreen>
      </FullScreen>
    </PageTransition>
  );
};

export default Home;

import { ButtonGroup, Stack, Typography } from '@mui/material';
import { FC, useCallback } from 'react';
import ComeAndGo from '../components/Animation/ComeAndGo';
import PageTransition from '../components/Animation/PageTransition';
import Arrow from '../components/UI/Arrow/Arrow';
import BetterButton from '../components/UI/BetterButton/BetterButton';
import SplashScreen from '../components/UI/SplashScreen';
import '../assets/css/default.css';
import i18next from 'i18next';

const Home: FC = () => {
  const changeLng = useCallback(async (language: string) => {
    await i18next.changeLanguage(language);
  }, []);

  return (
    <PageTransition>
      <SplashScreen position="absolute" zIndex="1">
        <Stack alignSelf="center" flexDirection="column" justifyContent="flex-end" flexGrow={0.25}>
          <Typography variant="h1">Forgotten Shores</Typography>
        </Stack>
        <Stack alignSelf="center" flexDirection="column" flexGrow={1} justifyContent="center">
          {/* <Typography variant="body1">Sea of thieves VR</Typography> */}
        </Stack>
        <Stack alignSelf="center" flexDirection="column" flexGrow={0.75}>
          <BetterButton to="WIP" size="large" FramerAnimation={ComeAndGo}>
            <Arrow />
          </BetterButton>
        </Stack>
        <Stack position="absolute" flexDirection="row" left={20} bottom={20}>
          <ButtonGroup size="small" color="inherit" variant="text">
            <BetterButton onClick={() => changeLng('fr')}>FR</BetterButton>
            <BetterButton onClick={() => changeLng('en')}>EN</BetterButton>
            <BetterButton onClick={() => changeLng('es')}>ES</BetterButton>
          </ButtonGroup>
        </Stack>
      </SplashScreen>
    </PageTransition>
  );
};

export default Home;

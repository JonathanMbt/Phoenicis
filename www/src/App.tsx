import { ButtonGroup, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import './assets/css/default.css';
import ComeAndGo from './components/Animation/ComeAndGo';
import PageTransition from './components/Animation/PageTransition';
import Arrow from './components/UI/Arrow/Arrow';
import BetterButton from './components/UI/BetterButton/BetterButton';
import SplashScreen from './components/UI/SplashScreen';

const App: FC = () => {
  return (
    <PageTransition>
      <SplashScreen>
        <Stack alignSelf="center" flexDirection="column" justifyContent="flex-end" flexGrow={0.25}>
          <Typography variant="h1">Forgotten Shores</Typography>
        </Stack>
        <Stack alignSelf="center" flexDirection="column" flexGrow={1} justifyContent="center">
          {/* <Typography variant="body1">Sea of thieves VR</Typography> */}
        </Stack>
        <Stack alignSelf="center" flexDirection="column" flexGrow={0.75}>
          {/* <BetterButton to="/test" size="large">
              Enter
              </BetterButton> */}
          <BetterButton to="test" size="large" FramerAnimation={ComeAndGo}>
            <Arrow />
          </BetterButton>
        </Stack>
        <Stack position="absolute" flexDirection="row" left={20} bottom={20}>
          <ButtonGroup size="small" color="inherit" variant="text">
            <BetterButton>FR</BetterButton>
            <BetterButton>EN</BetterButton>
            <BetterButton>ES</BetterButton>
          </ButtonGroup>
        </Stack>
      </SplashScreen>
    </PageTransition>
  );
};

export default App;

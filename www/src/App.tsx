import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import './assets/css/default.css';
import SplashScreen from './components/UI/SplashScreen';
import PageTransition from './hooks/animation/PageTransition';

const App: FC = () => {
  return (
    <PageTransition>
      <SplashScreen>
        <Stack alignSelf="center" flexDirection="column" justifyContent="flex-end" flexGrow={0.25}>
          <Typography variant="h1">Forgotten Shores</Typography>
        </Stack>
        <Stack alignSelf="center" flexDirection="column" flexGrow={1} justifyContent="center">
          <Typography variant="body1">Sea of thieves VR</Typography>
        </Stack>
        <Stack alignSelf="center" flexDirection="column" flexGrow={0.75}>
          <Typography variant="h5" margin={2}>
            ENTER
          </Typography>
        </Stack>
        <Stack position="absolute" flexDirection="row" left={20} bottom={20}>
          <ButtonGroup color="inherit" variant="text">
            <Link to="test">FR</Link>
            <Button>EN</Button>
            <Button>ES</Button>
          </ButtonGroup>
        </Stack>
      </SplashScreen>
    </PageTransition>
  );
};

export default App;

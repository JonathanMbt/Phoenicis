import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import './assets/css/default.css';
import SplashScreen from './components/SplashScreen';

const App: FC = () => {
  return (
    <SplashScreen>
      <Stack
        alignSelf="center"
        flexDirection="column"
        justifyContent="flex-end"
        flexGrow={0.25}
      >
        <Typography variant="h1">Forgotten Shores</Typography>
      </Stack>
      <Stack
        alignSelf="center"
        flexDirection="column"
        flexGrow={1}
        justifyContent="center"
      >
        <Typography variant="body1">Sea of thieves VR</Typography>
      </Stack>
      <Stack alignSelf="center" flexDirection="column" flexGrow={0.75}>
        <Typography variant="h5" margin={2}>
          ENTER
        </Typography>
      </Stack>
      <Stack position="absolute" flexDirection="row" left={20} bottom={20}>
        <ButtonGroup color="inherit" variant="text">
          <Button>FR</Button>
          <Button>EN</Button>
          <Button>ES</Button>
        </ButtonGroup>
      </Stack>
    </SplashScreen>
  );
};

export default App;

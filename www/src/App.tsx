import { FC } from 'react';

const App: FC = () => {
  return (
    <SplashScreen>
      <Stack
        alignSelf="center"
        flexDirection="column"
        justifyContent="center"
        flexGrow={0.5}
      >
        <Typography variant="h1">Forgotten Shores</Typography>
      </Stack>
      <Stack
        alignSelf="center"
        flexDirection="column"
        justifyContent="center"
        flexGrow={1}
      >
        <Typography variant="subtitle1">lorem ipsum</Typography>
      </Stack>
      <Stack
        flexDirection="column"
        justifyContent="center"
        flexGrow={0.5}
      ></Stack>
    </SplashScreen>
  );
};

export default App;

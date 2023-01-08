import { makeStyles } from 'tss-react/mui';

const useArrowStyles = makeStyles<{ orientationDeg: string; color: string }>()(
  (theme, { orientationDeg, color }) => ({
    arrowBody: {
      display: 'inline-block',
      border: `solid ${color}`,
      borderWidth: '0 0.25em 0.25em 0',
      padding: '1vw',
      rotate: orientationDeg,
    },
  })
);

export default useArrowStyles;

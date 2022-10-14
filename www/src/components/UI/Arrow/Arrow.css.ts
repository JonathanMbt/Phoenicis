import { makeStyles } from 'tss-react/mui';

const useArrowStyles = makeStyles<{ orientationDeg: string }>()((theme, { orientationDeg }) => ({
  arrowBody: {
    display: 'inline-block',
    border: 'solid black',
    borderWidth: '0 0.25em 0.25em 0',
    padding: '1vw',
    rotate: orientationDeg,
  },
}));

export default useArrowStyles;

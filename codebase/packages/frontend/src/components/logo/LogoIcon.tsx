// material-ui
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 * import { ThemeMode } from 'config';
 *
 */
import logoIconDark from 'assets/images/logo/logo_dark.png';
import logoIcon from 'assets/images/logo/logo_light.png';
// ==============================|| LOGO ICON SVG ||============================== //

export default function LogoIcon() {
  const theme = useTheme();

  return (
    <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="MY_APP" width="50" style={{marginTop: 14}} />
  );
}

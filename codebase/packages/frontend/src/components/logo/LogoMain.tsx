import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';
import logoDark from '../../assets/images/logo/logo_dark.png';
import logo from '../../assets/images/logo/logo_light.png';

export default function LogoMain({ reverse }: { reverse?: boolean }) {
  const theme = useTheme();
  return (
    <>
      <img 
        src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} 
        alt="[ALT TEXT]" 
        width="100"  
        style={{ marginTop: 35, padding: 2, marginLeft: 0, display: 'block', textAlign: 'left' }} 
      />
    </>
  );
}

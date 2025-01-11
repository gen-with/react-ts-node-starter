import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import { openSnackbar } from 'api/snackbar';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// types
import { SnackbarProps } from 'types/snackbar';

// assets
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import { FormOutlined } from '@ant-design/icons';
import { OpenTopic } from 'types/e-commerce';
import { format } from 'date-fns'; // Import the date-fns library for date formatting


// ==============================|| PRODUCT CARD ||============================== //
export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export interface TopicCardProps extends KeyedObject {
  data: OpenTopic;
}

export default function TopicCard({ data }: TopicCardProps) {
  const theme = useTheme();
  const [wishlisted, setWishlisted] = useState<boolean>(false);

  const selectTopic = () => {
  };

  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    openSnackbar({
      open: true,
      message: 'Added to favorites',
      variant: 'alert',
      alert: {
        color: 'success'
      }
    } as SnackbarProps);
  };

  const getAgencyImage = (topic_branch: string) => {
    // console.log(topic_branch);

    switch (topic_branch) {
      case 'Department of Health and Human Services':
        return getImageUrl('dohs.png', ImagePath.AGENCY_LOGOS) as ImagePath;
      case 'National Institutes of Health':
        return getImageUrl('nih.png', ImagePath.AGENCY_LOGOS) as ImagePath;
      case 'Department of Defense':
        return getImageUrl('dod.png', ImagePath.AGENCY_LOGOS) as ImagePath;
      case 'Army':
        return getImageUrl('army.png', ImagePath.AGENCY_LOGOS) as ImagePath;
      case 'Defense Advanced Research Projects Agency':
        return getImageUrl('darpa.png', ImagePath.AGENCY_LOGOS) as ImagePath;
      case 'Navy':
        return getImageUrl('usn.png', ImagePath.AGENCY_LOGOS) as ImagePath;
    }
  };
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy'); // Format the date as needed
  };
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard content={false} boxShadow sx={{ '&:hover': { transform: 'scale3d(1.02, 1.02, 1)', transition: 'all .4s ease-in-out' } }}>
          <Box
            sx={{
              height: 75, // Set the height for the container
              width: 75, // Set the width for the container
              padding: '0.25rem', // Add padding to the container
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: '100%', // Ensure the image scales to fill the container height
                width: '100%', // Ensure the image scales to fill the container width
                objectFit: 'contain', // Ensure the image fits within the container without clipping
              }}
              image={getAgencyImage(data.topic_branch)}
              alt="Agency"
            />
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              width: '100%',
              position: 'absolute',
              top: 0,
              pt: 1.75,
              pl: 2,
              pr: 2,
              right: 0
            }}
          >
            <IconButton
              color="secondary"
              sx={{ '&:hover': { bgcolor: 'transparent' } }}
              onClick={selectTopic}
            >
              <FormOutlined style={{ fontSize: '1.15rem' }} />
            </IconButton>
            <IconButton
              color="secondary"
              sx={{ ml: 1, '&:hover': { bgcolor: 'transparent' } }}
              onClick={addToFavourite}
            >
              {wishlisted ? (
                <HeartFilled style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
              ) : (
                <HeartOutlined style={{ fontSize: '1.15rem' }} />
              )}
            </IconButton>
          </Stack>

          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack>
                  <Typography
                    component={Link}
                    to={`/apps/e-commerce/product-details/${data.solicitation_id}`}
                    color="text.primary"
                    variant="h5"
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                  >
                    {data.solicitation_title.substring(0, 80) + '...'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" >
                  <Stack sx={{ width: 500 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        // label="Enter your text"
                        multiline
                        rows={12} // Number of rows you want to display
                        variant="outlined"
                        value={data.topic_description}
                        fullWidth />
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* <CalendarTodayIcon /> */}
                      <Typography variant="h6"><b>Open: </b>{formatDate(data.open_date)}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* <AccessTimeIcon /> */}
                      <Typography variant="h6"><b>Close: </b>{formatDate(data.close_date)}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
}

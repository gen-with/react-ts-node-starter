import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { TopicsFilter } from 'types/e-commerce';
import { ListItemText, MenuItem, Select } from '@mui/material';

// ==============================|| TOPICS GRID PHASE FILTER ||============================== //
function Phase({ phase, handelFilter }: { phase: string[]; handelFilter: (type: string, params: string) => void }) {
  const [isPhaseLoading, setPhaseLoading] = useState(true);

  useEffect(() => {
    setPhaseLoading(false);
  }, []);

  return (
    <Stack>
      {isPhaseLoading ? (
        <Skeleton variant="rectangular" width="100%" height={42} />
      ) : (
        <>
          <Typography variant="h5">Phase</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Stack>
              <FormControlLabel
                control={<Checkbox checked={phase.some((item) => item === 'I')} />}
                onChange={() => handelFilter('phase', 'i')}
                label="Phase I"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={phase.some((item) => item === 'II')}
                    onChange={() => handelFilter('phase', 'ii')}
                    color="secondary"
                  />
                }
                label="Phase II"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={phase.some((item) => item === 'III')}
                    onChange={() => handelFilter('phase', 'iii')}
                    color="error"
                  />
                }
                label="Phase III"
              />
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  )
}
const agencies = [
  { name: "DOD", fullName: "Department of Defense" },
  { name: "DARPA", fullName: "Defense Advanced Research Projects Agency" },
  { name: "Army", fullName: "U.S. Army" },
  { name: "Navy", fullName: "U.S. Navy" },
  { name: "Air Force", fullName: "U.S. Air Force" },
  { name: "USMC", fullName: "U.S. Marine Corps" },
  { name: "MDA", fullName: "Missile Defense Agency" },
  { name: "DHA", fullName: "Defense Health Agency" },
  { name: "SOCOM", fullName: "Special Operations Command" },
  { name: "NGA", fullName: "National Geospatial-Intelligence Agency" },
  { name: "DLA", fullName: "Defense Logistics Agency" },
  { name: "HHS", fullName: "Department of Health and Human Services" },
  { name: "NIH", fullName: "National Institutes of Health" },
  { name: "FDA", fullName: "Food and Drug Administration" },
  { name: "CDC", fullName: "Centers for Disease Control and Prevention" },
  { name: "NASA", fullName: "National Aeronautics and Space Administration" },
  { name: "NSF", fullName: "National Science Foundation" },
  { name: "DOE", fullName: "Department of Energy" },
  { name: "ARPA-E", fullName: "Advanced Research Projects Agency-Energy" },
  { name: "DHS", fullName: "Department of Homeland Security" },
  { name: "USDA", fullName: "Department of Agriculture" },
  { name: "NIST", fullName: "National Institute of Standards and Technology" },
  { name: "NOAA", fullName: "National Oceanic and Atmospheric Administration" },
  { name: "ED", fullName: "Department of Education" },
  { name: "DOT", fullName: "Department of Transportation" },
  { name: "EPA", fullName: "Environmental Protection Agency" },
  { name: "VA", fullName: "Department of Veterans Affairs" },
];
function Agency({ agency, handelFilter }: { agency: string; handelFilter: (type: string, params: string) => void }) {
  const [isAgencyLoading, setAgencyLoading] = useState(true);
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);

  const handleChange = (event: any) => {
    setSelectedAgencies(event.target.value);
  };
  useEffect(() => {
    setAgencyLoading(false);
  }, []);

  return (
    <Stack>
      {isAgencyLoading ? (
        <Skeleton variant="rectangular" width="100%" height={42} />
      ) : (
        <>
          <Typography variant="h5">Agency</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Stack>
              {/* <FormControlLabel
              control={<Checkbox checked={agency.some((item) => item === 'I')} />}
              onChange={() => handelFilter('phase', 'i')}
              label="Phase I"
            /> */}
              <Select
                labelId="agency-select-label"
                id="agency-select"
                multiple
                value={selectedAgencies}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {agencies.map((agency) => (
                  <MenuItem key={agency.name} value={agency.name}>
                    <Checkbox checked={selectedAgencies.indexOf(agency.name) > -1} />
                    <ListItemText primary={agency.name} secondary={agency.fullName} />
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  )
}

export default function TopicFilter({
  filter,
  handelFilter
}: {
  filter: TopicsFilter;
  handelFilter: (type: string, params: string, rating?: number) => void;
}) {
  return (
    <Grid container direction="column" rowSpacing={3}>
      <Grid item>
        <Phase phase={filter.phase} handelFilter={handelFilter} />
      </Grid>
      <Grid item>
        <Agency agency={filter.agency} handelFilter={handelFilter} />
      </Grid>
      {/* <Grid item>
        <Colors colors={filter.colors} handelFilter={handelFilter} />
      </Grid>
      <Grid item>
        <Price price={filter.price} handelFilter={handelFilter} />
      </Grid>
      <Grid item>
        <RatingSection rating={filter.rating} handelFilter={handelFilter} />
      </Grid> */}
    </Grid>
  );
}

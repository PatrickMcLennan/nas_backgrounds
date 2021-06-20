import { Box, CircularProgress, Grid } from '@material-ui/core';

export default function GridScrollLoader() {
  return (
    <Grid item sm={12}>
      <Box display="flex" alignItems="center" justifyContent="center" p={5}>
        <CircularProgress />
      </Box>
    </Grid>
  );
}

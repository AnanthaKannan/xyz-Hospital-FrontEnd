import PropTypes from "prop-types";
import { Grid, Backdrop } from "@mui/material";
import { CircularProgress as Circular } from "@mui/material";

export const CircularProgress = () => <Circular />;

export const FullScreenLoader = ({ isFetching }) => {
  return (
    <Grid container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <Circular />
      </Backdrop>
    </Grid>
  );
};

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import React from "react";

interface ISpinnerProps {
  loading?: boolean;
}

const Spinner = ({ loading }: ISpinnerProps) => {
  return (
    <Fade
      in={loading}
      style={{
        transitionDelay: loading ? "100ms" : "0ms"
      }}
      unmountOnExit
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#8888"
        }}
      >
        <Stack
          sx={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <CircularProgress />
        </Stack>
      </Box>
    </Fade>
  );
};

export default React.memo(Spinner);

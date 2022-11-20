import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { LocalShipping, MopedRounded } from "@mui/icons-material";

function ButtonSchedule(props) {
  const { label, onClick, type } = props;
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          onClick={onClick}
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "#0b5b8d",
            margin: "10px",
            "&:hover": {
              backgroundColor: "#0b5b8d",
              color: "#eee",
            },
          }}
          startIcon={type === "truck" ? <LocalShipping /> : <MopedRounded />}
        >
          {label}
        </Button>
      </Stack>
    </div>
  );
}

export default ButtonSchedule;

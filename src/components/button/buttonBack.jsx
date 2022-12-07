import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function ButtonBack(props) {
  const { label, onClick } = props;
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          sx={{
            color: "#333",
            backgroundColor: "#eee",
            margin: "10px",

            "&:hover": {
              backgroundColor: "#eee",
              color: "#000",
            },
          }}
          onClick={onClick}
        >
          {label}
        </Button>
      </Stack>
    </div>
  );
}

export default ButtonBack;

import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Delete } from "@mui/icons-material";

function ButtonDelete(props) {
  const { label, onClick } = props;
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          onClick={onClick}
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "#D11A2A",
            margin: "10px",
            "&:hover": {
              backgroundColor: "#D11A2A",
              color: "#eee",
            },
          }}
          startIcon={<Delete />}
        >
          {label}
        </Button>
      </Stack>
    </div>
  );
}

export default ButtonDelete;

import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";

function ButtonAdd(props) {
  const { label, onClick } = props;
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          onClick={onClick}
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "#007041",
            margin: "10px",
            "&:hover": {
              backgroundColor: "#007041",
              color: "#eee",
            },
          }}
          startIcon={<Add />}
        >
          {label}
        </Button>
      </Stack>
    </div>
  );
}

export default ButtonAdd;

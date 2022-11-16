import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Save } from "@mui/icons-material";

function ButtonSave(props) {
  const { label, onClick } = props;
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          onClick={onClick}
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "#24a0ed",
            margin: "10px",
            "&:hover": {
              backgroundColor: "#24a0ed",
              color: "#eee",
            },
          }}
          startIcon={<Save />}
        >
          {label}
        </Button>
      </Stack>
    </div>
  );
}

export default ButtonSave;

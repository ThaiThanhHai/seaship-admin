import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "65%",
  transform: "translate(-65%, -65%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 4,
  borderRadius: 4,
};

export default function ModalLogout({ open, setOpen, setIsLogout }) {
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    setIsLogout(true);
    setOpen(false);
  };

  const handleCancel = () => {
    setIsLogout(false);
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Typography id="modal-modal-description" sx={{ mb: 4, mt: 2 }}>
              Bạn có chắc chắn muốn đăng xuất
            </Typography>
            <Button sx={{ float: "right" }} onClick={handleConfirm}>
              Đăng xuất
            </Button>
            <Button sx={{ float: "right" }} onClick={handleCancel}>
              Hủy
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

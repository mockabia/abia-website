import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const MobEnquiry = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="modal-title">Message Vendor</h2>
        <TextField fullWidth label="Name" variant="outlined" margin="normal" />
        <TextField fullWidth label="Email" variant="outlined" margin="normal" />
        <TextField fullWidth label="Phone" variant="outlined" margin="normal" />
        <textarea placeholder="Write your message" className="pp-textarea" />
        <Button variant="contained" onClick={onClose}>
          Send
        </Button>
      </Box>
    </Modal>
  );
};

export default MobEnquiry;

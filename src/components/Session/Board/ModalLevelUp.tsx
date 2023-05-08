import React from 'react';
import Modal from "@mui/material/Modal";

interface IModalLevelUp {
    open: boolean;
}
const ModalLevelUp = ({
  open
}: IModalLevelUp) => {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>asd</div>
        </Modal>
    )
}

export default ModalLevelUp;
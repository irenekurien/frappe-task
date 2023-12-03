import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

type DetailsPopupType = {
    isOpen: boolean;
    handleClose: () => void;
    rowData: any;
};

const DetailsPopup = ({ isOpen, handleClose, rowData }: DetailsPopupType) => {

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>View Signature Details</DialogTitle>
            <DialogContent sx={{ py: '20px' }}>
                {/* {currentUser && otherUser ? (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '5px',
                            }}
                        >
                            <Card idx="1" isSigned={currentUser.isSigned} {...currentUser.user} />
                            <Card idx="2" isSigned={otherUser.isSigned} {...otherUser.user} />
                        </div>
                    </>
                ) : (
                    ''
                )} */}
            </DialogContent>
            <DialogActions sx={{ p: '20px', display: 'flex', justifyContent: 'center' }}>
                {/* <Button
                    disabled={!(currentUser?.isSigned && otherUser?.isSigned)}
                    onClick={downloadCert}
                >
                    Download Signed Document
                </Button>
                {currentUser && userRole === UserRole.USER && currentUser.isSigned === false ? (
                    <Button
                        onClick={() => {
                            window.open(currentUser.signLink, '_blank');
                            console.log(currentUser.signLink);
                        }}
                    >
                        Sign on behalf of {user.name}
                    </Button>
                ) : (
                    <></>
                )}

                <Button varient="outlined" onClick={handleClose}>
                    Close
                </Button> */}
            </DialogActions>
        </Dialog>
    );
};

export default DetailsPopup;

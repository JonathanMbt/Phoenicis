import { Button, Box, ButtonGroup, IconButton, Stack, Typography, Modal, TextField } from '@mui/material';
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import BetterButton from './UI/BetterButton/BetterButton';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { textAlign } from '@mui/system';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ConnectionModal: FC = () => {
    const { t } = useTranslation('connectionModal');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen}><Typography variant="body2">{t('title.connection')}</Typography></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack alignContent='center' sx={style}>
                    <Typography variant="h4" textAlign="center">{t('title.connection')}</Typography>
                    <TextField id="standard-basic" label={t('label.email')} variant="standard" />
                    <TextField id="standard-basic" label={t('label.password')} variant="standard" type="password" />
                    <BetterButton sx={{ marginTop: 4 }}><Typography variant="body2" textAlign="center">{t('label.startConnection')}</Typography></BetterButton>
                </Stack>
            </Modal>
        </>
    );
};

export default ConnectionModal;

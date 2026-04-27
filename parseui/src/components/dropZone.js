import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useState } from 'react';
import { Avatar, Grid, InputLabel, Typography, TextField, Button } from '@mui/material';
import idleI from '@assets/homer_happy.png';
import errorI from '@assets/homer_error.png';
import successI from '@assets/homer_success.png';
import initialI from '@assets/homer_idle.png';
import Form from './form';
import { postData, setUrl } from '../api/service';
const DropZone = () => {
    const [data, setData] = useState(null);
    const [dataPasted, setDataPasted] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const setText = (v) => {
        setDataPasted(v);
    };
    const parseData = () => {
        setLoading(true);
        const dataToSend = { text: dataPasted }; //JSON.stringify
        postData(setUrl('PARSE_DATA'), dataToSend).then((response) => {
            console.log('API response', response);
            if (response.error) {
                setError(response.msg);
            }
            else {
                setData(response);
            }
        }).catch((error) => {
            console.log('API error', error);
            setError('Network error');
        }).finally(() => {
            setLoading(false);
        });
    };
    const resetData = () => {
        setError(null);
        setDataPasted(null);
        setData(null);
    };
    const checkDataState = () => {
        const settings = {
            alt: 'Waiting for text to be pasted',
            src: initialI,
            color: '1px solid #333'
        };
        if (data) {
            settings.alt = 'Data parsed';
            settings.src = successI;
            settings.color = '1px solid #397056';
        }
        if (!data && dataPasted) {
            settings.alt = 'Please parse the data';
            settings.src = idleI;
            settings.color = '1px solid #2959dd';
        }
        if (error) {
            settings.alt = 'There is an error';
            settings.src = errorI;
            settings.color = '1px solid #e25412';
        }
        return settings;
    };
    const dataState = checkDataState();
    return (_jsxs("div", { children: [_jsx("h2", { children: "Cost details parser:" }), _jsxs(Grid, { container: true, spacing: 4, children: [_jsxs(Grid, { size: { sm: 4 }, children: [_jsx(Avatar, { alt: dataState.alt, src: dataState.src, sx: { width: 88, height: 88, alignSelf: 'center', justifySelf: 'center', border: dataState.color } }), error && _jsxs("div", { children: [_jsx("h3", { children: "Parsing error" }), JSON.stringify(error)] })] }), _jsxs(Grid, { size: { sm: 8 }, children: [_jsx(InputLabel, { shrink: false, htmlFor: 'drop-zone', children: _jsx(Typography, { children: "Drop text for parsing:" }) }), _jsx(TextField, { id: 'drop-zone', name: 'drop-zone', fullWidth: true, variant: 'outlined', type: "text", multiline: true, maxRows: 10, minRows: 6, 
                                // @ts-ignore
                                InputLabelProps: {
                                    shrink: true,
                                }, InputProps: {
                                    readOnly: true,
                                }, value: dataPasted || '', onChange: (event) => {
                                    setText(event.target.value);
                                } })] }), _jsxs(Grid, { size: { sm: 12 }, style: { display: 'flex', gap: 16, justifyContent: 'center' }, children: [_jsx(Button, { variant: 'contained', color: 'primary', disabled: loading || error || !dataPasted || data, size: 'small', onClick: parseData, children: "Parse Text" }), _jsx(Button, { variant: 'outlined', color: 'primary', disabled: loading || !dataPasted, size: 'small', onClick: resetData, children: "Reset" })] }), data && _jsxs(Fragment, { children: [_jsxs(Grid, { size: { sm: 12 }, children: [_jsx("h4", { children: "Row data:" }), JSON.stringify(data)] }), _jsx(Form, { data: data })] })] })] }));
};
export default DropZone;

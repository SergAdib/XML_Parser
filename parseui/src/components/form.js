import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, InputLabel, Typography, TextField } from '@mui/material';
import { labels } from '../constants/definition';
const Form = (props) => {
    const { data } = props;
    if (!data)
        return null;
    return (_jsxs("div", { children: [_jsx("h3", { children: "Cost details:" }), _jsx(Grid, { container: true, spacing: 2, children: Object.keys(data).map((key, index) => {
                    const name = key;
                    const val = data[key];
                    // @ts-ignore
                    const label = (labels[name] || '');
                    return (_jsxs(Grid, { size: { sm: 12, md: 6, lg: 4 }, children: [_jsx(InputLabel, { shrink: false, htmlFor: name, children: _jsx(Typography, { children: label }) }), _jsx(TextField, { id: name, name: name, fullWidth: true, variant: 'outlined', type: "text", ...(name == 'description' ? { multiline: true } : null), ...(name == 'description' ? { maxRows: 5 } : null), ...(name == 'description' ? { minRows: 3 } : null), 
                                // @ts-ignore
                                InputLabelProps: {
                                    shrink: true,
                                }, InputProps: {
                                    readOnly: true,
                                }, size: 'small', value: val })] }, `control-${index}`));
                }) })] }));
};
export default Form;

import { Grid, InputLabel, Typography, TextField } from '@mui/material'
import { labels } from '../constants/definition'

const Form = (props: any) => {
  
  const { data } = props

  if (!data) return null

  return (
    <div>
      <h3>Cost details:</h3>
      <Grid container spacing={2}>
          {Object.keys(data).map((key: string, index: number) => {
            const name = key as string
            const val = data[key] as string | number | null
            // @ts-ignore
            const label = (labels[name] || '') as string
            return (
              <Grid size={{sm: 12, md: 6, lg: 4}} key={`control-${index}`}>
                <InputLabel shrink={false} htmlFor={name}>
                    <Typography>{label}</Typography>
                </InputLabel>
                <TextField
                    id={name}
                    name={name}
                    fullWidth
                    variant={'outlined'}
                    type={"text"}
                    {...(name == 'description' ? {multiline : true} : null)}
                    {...(name == 'description' ? {maxRows : 5} : null)}
                    {...(name == 'description' ? {minRows : 3} : null)}
                    // @ts-ignore
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        readOnly: true,
                    }}
                    size={'small'}
                    value={val}
                />
                </Grid>
            )})}
      </Grid>
    </div>
  )
}

export default Form

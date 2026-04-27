import { Fragment, useState } from 'react'
import { Avatar, Grid, InputLabel, Typography, TextField, Button } from '@mui/material'
import idleI from '@assets/homer_happy.png'
import errorI from '@assets/homer_error.png'
import successI from '@assets/homer_success.png'
import initialI from '@assets/homer_idle.png'
import Form from './form'
import { postData, setUrl } from '../api/service' 

const DropZone = () => {
  
  const [data, setData] = useState(null) as any
  const [dataPasted, setDataPasted] = useState(null) as any
  const [error, setError] = useState(null) as any
  const [loading, setLoading] = useState(false)
  
  const setText = (v: string) => {
    setDataPasted(v)
  }

  const parseData = () => {
    setLoading(true)
    const dataToSend = {text: dataPasted} //JSON.stringify
    postData(setUrl('PARSE_DATA'), dataToSend).then((response: any) => {
            console.log('API response', response)
            if (response.error) {
                setError(response.msg)
            } else {
                setData(response)
            }            
        }).catch((error: any) => {
            console.log('API error', error)
            setError('Network error')
        }).finally(() => {
            setLoading(false)
        })
  }

  const resetData = () => {
    setError(null)
    setDataPasted(null)
    setData(null)
  }

  const checkDataState = () => {
    const settings = {
        alt: 'Waiting for text to be pasted',
        src: initialI,
        color: '1px solid #333'
    }    
    if (data) {
        settings.alt = 'Data parsed'
        settings.src = successI
        settings.color = '1px solid #397056'
    }
    if (!data && dataPasted) {
        settings.alt = 'Please parse the data'
        settings.src = idleI
        settings.color = '1px solid #2959dd'
    }
    if (error) {
        settings.alt = 'There is an error'
        settings.src = errorI
        settings.color = '1px solid #e25412'
    }
    return settings
  }

  const dataState = checkDataState()

  return (
    <div>
      <h2>Cost details parser:</h2>
      <Grid container spacing={4}>
        <Grid size={{sm: 4}}>
            <Avatar
                alt={dataState.alt}
                src={dataState.src}
                sx={{ width: 88, height: 88, alignSelf: 'center', justifySelf: 'center', border: dataState.color }}
            />
            {error && <div>
                <h3>Parsing error</h3>
                {JSON.stringify(error)}
            </div>}
        </Grid>
        <Grid size={{sm: 8}}>
        <InputLabel shrink={false} htmlFor={'drop-zone'}>
            <Typography>Drop text for parsing:</Typography>
        </InputLabel>
        <TextField                
            id={'drop-zone'}
            name={'drop-zone'}
            fullWidth
            variant={'outlined'}
            type={"text"}
            multiline
            maxRows={10}
            minRows={6}
            // @ts-ignore
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                readOnly: true,
            }}
            value={dataPasted || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setText(event.target.value)
            }}
        />
        </Grid>
        <Grid size={{sm: 12}} style={{display: 'flex', gap: 16, justifyContent: 'center'}}>
            <Button
                variant={'contained'}
                color={'primary'}
                disabled={loading || error || !dataPasted || data}
                size={'small'}
                onClick={parseData}
                >
                Parse Text
            </Button>
            <Button
                variant={'outlined'}
                color={'primary'}
                disabled={loading || !dataPasted}
                size={'small'}
                onClick={resetData}                
                >
                Reset
            </Button>
        </Grid>
        {data && <Fragment>
            <Grid size={{sm: 12}}>
                <h4>Row data:</h4>
                {JSON.stringify(data)}
            </Grid>
            <Form data={data}/>
        </Fragment>}
      </Grid>
    </div>
  )
}

export default DropZone

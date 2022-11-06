import { styled } from '@mui/material';

export default styled('form')(({theme}) => ({
  '& .MuiTextField-root': {
    background: '#fff',
    margin: theme.spacing(1),
    width: '25ch' 
  },
}))

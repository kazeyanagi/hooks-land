import {
  Box,
  Typography
} from '@mui/material';

const Title = ({children}) => {
  return (
    <Box>
      <Typography variant="h1">{children}</Typography>
    </Box>
  )
}

export default Title;
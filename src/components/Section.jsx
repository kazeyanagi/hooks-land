import { Divider, Typography, styled } from '@mui/material';

const SectionWrapper = styled('section')(({theme}) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3)
}))

const Section = ({title, children}) => {
  return (
    <SectionWrapper>
      <Typography variant='h2'>{title}</Typography>
      <Divider sx={{mb: 2}}/>
      {children}
    </SectionWrapper>
  )
}

export default Section;
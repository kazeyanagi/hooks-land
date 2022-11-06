import { Typography, styled } from '@mui/material';

const SectionWrapper = styled('section')(({theme}) => ({
  marginBottom: theme.spacing(1)
}))

const SubSection = ({title, children}) => {
  return (
    <SectionWrapper>
      <Typography variant='h3' sx={{pb: 2}}>{title}</Typography>
      {children}
    </SectionWrapper>
  )
}

export default SubSection;
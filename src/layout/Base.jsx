import { Outlet } from 'react-router-dom';
import {
  Box,
  Typography,
  Container
} from '@mui/material';

import SideMenu from './components/SideMenu';


export const BaseLayout = ({sideItems}) => {
  return (
    <>
      <SideMenu items={sideItems}/>
      <Box
        sx={{
          marginLeft: '240px'
        }}
      >
        <Container
          sx={{
            pt: 4,
            pb: 2
          }}
        >
          <Outlet/>
        </Container>
      </Box>
    </>
  )
}
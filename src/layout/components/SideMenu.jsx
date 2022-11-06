import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';

const SideMenu =  (props) => {
  const {items} = props
  return (
    <Box sx={{
      position: 'fixed',
      width: 240,
      height: '100vh',
      borderRight: '#bdbdbd 2px solid'
    }}>
      <List>
        {items.map(item => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default SideMenu;
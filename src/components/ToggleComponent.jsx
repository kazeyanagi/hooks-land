import { Button } from '@mui/material';
import { useState } from 'react';

const ToggleComponent = ({children}) => {
  const [open, setOpen] = useState(false); 
  return (
    <>
      {open
        ? (
          <>
            {children}
            <Button onClick={() => setOpen(false)}>close</Button>
          </>
        ): (
          <Button onClick={() => setOpen(true)}>show</Button>
        )
      }
    </>
  )
}

export default ToggleComponent;
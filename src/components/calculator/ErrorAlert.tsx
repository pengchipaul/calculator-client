import React, { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

export interface ErrorAlertProps {
  title: string,
  errors: {
    [key: string]: string[]
  },
  onClose: Function
}

function ErrorAlert(props: ErrorAlertProps){

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(props.title !== ""){
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [props.title])

  return <div>
    <Dialog open={open} onClose={() => props.onClose()}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {Object.keys(props.errors).map((key, index) => (
            <React.Fragment key={index}>
              <h4>{key}:</h4>
              {props.errors[key].map((error, index) => (
                <p key={index}>{error}</p>
              ))}
              {index !== Object.keys(props.errors).length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  </div>
}

export default ErrorAlert
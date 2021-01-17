import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'

import { Pages } from '../../App'


const useStyles = makeStyles({
  list: {
    width: 250
  }
})

interface NavigationBarProps {
  title: String
  setPage: Function
}

function NavigationBar(props: NavigationBarProps) {

  const classes = useStyles()

  const [openDrawer, setOpenDrawer] = useState(false)

  return <AppBar position="static">
    <Toolbar>

      <IconButton edge="start" color="inherit" onClick={() => setOpenDrawer(true)} >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List className={classes.list}>
          {Object.keys(Pages).map((page, index) => (
            <ListItem button key={index} onClick={() => {props.setPage(page); setOpenDrawer(false)}}>
              <ListItemText>{page}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Typography variant="h6">
        {props.title}
      </Typography>
    </Toolbar>
  </AppBar>
}

export default NavigationBar
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

import { IRecord } from '../types/RecordType'

interface ReportContainerProps {
  records: IRecord[]
}

const useStyles = makeStyles({
  tableContainer: {
    padding: 20
  }
})

function ReportContainer(props: ReportContainerProps) {

  const classes = useStyles()

  return <TableContainer component={Paper} className={classes.tableContainer}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Row Number</TableCell>
          <TableCell>Equation</TableCell>
          <TableCell>Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.records.map((record, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{record.equation}</TableCell>
            <TableCell>{moment(record.timestamp.toString()).format("dddd, MMMM Do YYYY, h:mm:ss a")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}

export default ReportContainer
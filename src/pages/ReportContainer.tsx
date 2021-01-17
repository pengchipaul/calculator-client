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
import Button from '@material-ui/core/Button'

import { IRecord } from '../types/RecordType'
import ReportApi from '../services/reportApi'

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

  const generateReport = () => {
    ReportApi.pdf({ "Records": props.records})
      .then(response => {
        console.log("aaa")
      })
      .catch(error => {
        console.log("bbb")
      })

  }

  return <React.Fragment>
    <TableContainer component={Paper} className={classes.tableContainer}>
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
                <TableCell>{moment(record.createdAt.toString()).format("dddd, MMMM Do YYYY, h:mm:ss a")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="secondary" onClick={generateReport}>
        Generate Report
      </Button>
  </React.Fragment>
}

export default ReportContainer
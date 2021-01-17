import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import TimesIcon from "@material-ui/icons/Clear";
import Typography from "@material-ui/core/Typography";
import SnackBar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'

import "../styles/number-input.css";
import CalculatorApi from '../services/calculatorApi';
import ErrorAlert from '../components/calculator/ErrorAlert';
import { IRecord } from "../types/RecordType";

const useStyles = makeStyles({
  container: {
    paddingTop: 20,
  },

  resultSection: {
    height: 100,
    marginBottom: 50,
    padding: 20,
    overflow: "hidden"
  },

  equationSection: {
    height: 180,
    marginBottom: 50,
    padding: 20,
  },

  operationSection: {
    height: 100,
    marginBottom: 50,
    padding: 20,
  },

  divider: {
    marginBottom: 10,
  },

  icon: {
    marginRight: 10,
  },

  title: {
    marginBottom: 10,
  },

  numberInputSection: {
    display: "flex",
    justifyContent: "center",
    height: 50,
    padding: 10,
    textAlign: "center",
  },

  numberInput: {
    marginRight: 20,
  },
});

enum Operations {
  Add = "Add",
  Substract = "Substract",
  Multiply = "Multiply",
  Divide = "Divide",
  SplitEq = " (Split Eq) ",
  SplitNum = " (Split Num) ",
}

interface IErrorMsg {
  title: string,
  errors: {
    [key: string]: string[]
  }
}

interface CalculatorContainerProps {
  addRecord: Function
}

function CalculatorContainer(props: CalculatorContainerProps) {

  const classes = useStyles();

  const [inputNumber, setInputNumber] = useState(0);

  const [equationNumbers, setEquationNumbers] = useState<Number[]>([]);

  const [operation, setOperation] = useState(Operations.Add);

  const [resultRecord, setResultRecord] = useState("")

  const emptyError: IErrorMsg = {
    title: "",
    errors: {}
  }

  const [errorMsg, setErrorMsg] = useState<IErrorMsg>(emptyError)

  const [success, setSuccess] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setInputNumber(parseInt(event.target.value));
    } else {
      setInputNumber(0);
    }
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addNumberToEquation();
    }
  };

  const addNumberToEquation = () => {
    setEquationNumbers(equationNumbers.concat(inputNumber));
    setInputNumber(0);
  };

  const removeLastNumberFromEquation = () => {
    var newNumbers = [...equationNumbers]
    newNumbers.splice(equationNumbers.length - 1, 1)
    setEquationNumbers(newNumbers)
  }

  const getStringFromOperation = () => {
    switch (operation) {
      case Operations.Add:
        return " + ";
      case Operations.Substract:
        return " - ";
      case Operations.Multiply:
        return " * ";
      case Operations.Divide:
        return " / ";
      case Operations.SplitEq:
        return ", ";
      case Operations.SplitNum:
        return ", ";
      default:
        return " + ";
    }
  };

  const runCalculation = () => {
    switch(operation){
      case Operations.Add:
        CalculatorApi.add({"Numbers": equationNumbers})
          .then(response => {
            resetEquation(response)
          })
          .catch(error => {
            setErrorMsg(error)
          })
        return
      case Operations.Substract:
        CalculatorApi.substract({"Numbers": equationNumbers})
          .then(response => {
            resetEquation(response)
          })
          .catch(error => {
            setErrorMsg(error)
          })
        return
      case Operations.Multiply:
        CalculatorApi.multiply({"Numbers": equationNumbers})
          .then(response => {
            resetEquation(response)
          })
          .catch(error => {
            setErrorMsg(error)
          })
          return
      case Operations.Divide: 
          CalculatorApi.divide({"Numbers": equationNumbers})
            .then(response => {
              resetEquation(response)
            })
            .catch(error => {
              setErrorMsg(error)
            })
          return
      case Operations.SplitEq:
        CalculatorApi.splitEq({"Numbers": equationNumbers})
            .then(response => {
              resetEquation(response)
            })
            .catch(error => {
              setErrorMsg(error)
            })
        return
      case Operations.SplitNum:
        CalculatorApi.splitNum({"Numbers": equationNumbers})
            .then(response => {
              resetEquation(response)
            })
            .catch(error => {
              setErrorMsg(error)
            })
        return
      default:
        return
    }
  }

  const getResult = (result: Number) => {
    var resultStr = ""

    for(var i = 0; i < equationNumbers.length; i++){
      resultStr = resultStr + equationNumbers[i] 

      if(i !== equationNumbers.length - 1) {
        resultStr = resultStr + getStringFromOperation()
      }
    }

    if(operation === Operations.SplitEq || operation === Operations.SplitNum) {
      resultStr = resultStr + " " + operation.toString()
    }

    resultStr = resultStr + " = " + result

    return resultStr
  }

  const resetError = (error: IErrorMsg) => {
    setErrorMsg(emptyError)
  }

  const resetEquation = (result: Number) => {

    var resultRecord = getResult(result)
    var record: IRecord = {
      equation: resultRecord,
      createdAt: new Date()
    }
    props.addRecord(record)
    setSuccess(true)
    setResultRecord(resultRecord)
    if(operation === Operations.SplitNum || operation === Operations.SplitEq){
      setEquationNumbers([])
    } else {
      setEquationNumbers([result])
    }
  }

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} className={classes.resultSection}>
            <div className={classes.title}>Previous result:</div>
            <Divider className={classes.divider} />
            <Typography variant="h6" style={{height: "80px", overflowY: "auto"}}>
              {resultRecord}
            </Typography>
          </Paper>

          <Paper elevation={3} className={classes.equationSection}>
            <div className={classes.title}>Current equation:</div>
            <Divider className={classes.divider} />
            <Typography variant="h6" style={{height: "100px", overflowY: "auto"}}>
              {equationNumbers.map((num, index) => (
                <React.Fragment key={index}>
                  {num}
                  {(index !== equationNumbers.length - 1 || index === 0) &&
                    getStringFromOperation()}
                </React.Fragment>
              ))}
              {(operation === Operations.SplitEq || operation === Operations.SplitNum) &&
                operation.toString()
              }
            </Typography>
            <Divider className={classes.divider} />
            <Button variant="contained" color="primary" className={classes.icon} onClick={() => runCalculation()}>Calculate</Button>
            <Button variant="outlined" className={classes.icon} onClick={removeLastNumberFromEquation}>Remove last number</Button>
            <Button variant="outlined" className={classes.icon} onClick={() => setEquationNumbers([])}>Clear</Button>
          </Paper>

          <Paper elevation={3} className={classes.operationSection}>
            <div className={classes.title}>Select operation: </div>
            <Divider className={classes.divider} />
            <Fab
              color="secondary"
              className={classes.icon}
              onClick={() => setOperation(Operations.Add)}
            >
              <AddIcon />
            </Fab>
            <Fab
              color="secondary"
              className={classes.icon}
              onClick={() => setOperation(Operations.Substract)}
            >
              <MinusIcon />
            </Fab>
            <Fab
              color="secondary"
              className={classes.icon}
              onClick={() => setOperation(Operations.Multiply)}
            >
              <TimesIcon />
            </Fab>
            <Fab
              color="secondary"
              className={classes.icon}
              onClick={() => setOperation(Operations.Divide)}
            >
              <Typography variant="h6">/</Typography>
            </Fab>
            <Fab
              color="secondary"
              className={classes.icon}
              onClick={() => setOperation(Operations.SplitEq)}
            >
              Split Eq
            </Fab>
            <Fab
              color="secondary"
              className={classes.icon}
              onClick={() => setOperation(Operations.SplitNum)}
            >
              Split Num
            </Fab>
          </Paper>

          <Paper elevation={3} className={classes.numberInputSection}>
            <TextField
              variant="outlined"
              type="number"
              value={inputNumber + ""}
              onChange={handleInputChange}
              onKeyDown={handleEnterKeyDown}
              className={classes.numberInput}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addNumberToEquation}
            >
              Enter
            </Button>
          </Paper>

          <ErrorAlert errors={errorMsg.errors} title={errorMsg.title} onClose={resetError} />

          <SnackBar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
              <Alert severity="success">Calculation has been saved!</Alert>
          </SnackBar>
        </Grid>
      </Grid>
    </div>
  );
}

export default CalculatorContainer;

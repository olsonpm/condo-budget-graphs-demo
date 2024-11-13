import { useState } from 'react'
import axios from 'axios'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import { Button, ErrorDialog, TextField } from './cmpt'
import cfg from '../../config/client.json'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [showError, setShowError] = useState(false)
  const [inputError, setInputError] = useState(false)

  const onUsernameChange = evt => {
    setInputError(false)
    setUsername(evt.target.value)
  }
  const onPasswordChange = evt => {
    setInputError(false)
    setPassword(evt.target.value)
  }
  const onSubmit = async evt => {
    evt.preventDefault()
    try {
      const { status } = await axios.post(
        '/api/login',
        { username, password },
        { validateStatus: allow2xxAnd400 }
      )
      if (status === 200) {
        window.location.href = '/'
      } else {
        // status === 400
        setInputError(true)
      }
    } catch {
      setShowError(true)
    }
    return false
  }
  const onForgotClicked = () => setShowForgot(true)
  const onForgotClosed = () => setShowForgot(false)
  const onErrorClose = () => setShowError(false)

  return (
    <>
      <header className="content-frame">
        <h1>Condo Budget Graphs 2024</h1>
      </header>
      <div className="content-frame">
        <form onSubmit={onSubmit}>
          <Stack className="form-stack" alignItems="baseline">
            <TextField
              error={inputError}
              id="username"
              className="form-control"
              label="Username"
              onChange={onUsernameChange}
              variant="outlined"
              inputProps={{ value: username }}
            />
            <TextField
              error={inputError}
              id="password"
              className="form-control"
              label="Password"
              onChange={onPasswordChange}
              variant="outlined"
              type="password"
              inputProps={{ value: password }}
            />
            <div className="actions">
              <Button id="log-in" type="submit" variant="contained">
                Log In
              </Button>
              <Button
                id="forgot"
                onClick={onForgotClicked}
                type="button"
                variant="text"
              >
                I Forgot
              </Button>
            </div>
            {inputError && (
              <p className="invalid-credentials">
                Your credentials don&apos;t match my records. Please make sure
                they&apos;re correct
              </p>
            )}
          </Stack>
        </form>
        <Dialog className="dialog" onClose={onForgotClosed} open={showForgot}>
          <div className="content">
            <p className="email-me">
              Email me at&nbsp;
              <a href={`mailto:${cfg.myEmail}`} target="_blank">
                {cfg.myEmail}
              </a>
              &nbsp;for your credentials
            </p>
            <Button
              onClick={onForgotClosed}
              className="close-dialog"
              variant="outlined"
            >
              Close
            </Button>
          </div>
        </Dialog>
        <ErrorDialog onClose={onErrorClose} show={showError} />
      </div>
    </>
  )
}

function allow2xxAnd400(status) {
  return (status >= 200 && status < 300) || status === 400
}

export default Login

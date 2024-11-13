import Dialog from '@mui/material/Dialog'
import Button from './button'
import cfg from '../../../config/client.json'

const ErrorDialog = props => {
  const { onClose, show } = props
  return (
    <Dialog className="dialog" onClose={onClose} open={show}>
      <div className="content">
        <p className="email-me">
          Agh - something went wrong. Please email me at&nbsp;
          <a href={`mailto:${cfg.myEmail}`} target="_blank">
            {cfg.myEmail}
          </a>
          &nbsp;so I can fix it.
        </p>
        <Button onClick={onClose} className="close-dialog" variant="outlined">
          Close
        </Button>
      </div>
    </Dialog>
  )
}

export default ErrorDialog

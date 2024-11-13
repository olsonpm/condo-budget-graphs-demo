import cn from 'classnames'
import TextField from '@mui/material/TextField'

const CustomTextField = ({ className, ...props }) => {
  const slotProps = {
    ...(props.slotProps || {}),
    input: {
      ...(props.slotProps?.input || {}),
      className: cn('cb-textfield-input', props.slotProps?.input?.className),
      // sx: {
      //   ...(props.slotProps?.inputLabel?.sx || {}),
      //   fontSize: '20px',
      // },
    },
    inputLabel: {
      ...(props.slotProps?.inputLabel || {}),
      className: cn(
        'cb-textfield-input-label',
        props.slotProps?.inputLabel?.className
      ),
      // sx: {
      //   ...(props.slotProps?.inputLabel?.sx || {}),
      //   fontSize: '20px',
      //   fontWeight: 600,
      // },
    },
  }

  return (
    <TextField
      {...props}
      className={cn('cb-textfield', className)}
      slotProps={slotProps}
    />
  )
}

export default CustomTextField

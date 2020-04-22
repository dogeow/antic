import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import IconButton from '@material-ui/core/IconButton'
import FileCopyIcon from '@material-ui/icons/FileCopy'

const ClipboardButton = (props) => (
  <CopyToClipboard
    text={props.text}
    onCopy={() => props.handleClick()}>
    <IconButton size="small">
      <FileCopyIcon fontSize="inherit"/>
    </IconButton>
  </CopyToClipboard>
);

export default ClipboardButton

/* eslint "react/no-did-update-set-state": "off" */
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProfilePhoto extends Component {
  state = {
    open: false,
    imgSrc: null,
    filename: null,
    updatedImage: null,
    error: null,
  };

  componentWillMount() {
    const { open, imgSrc } = this.props;
    this.setState({ open, imgSrc });
  }

  componentDidUpdate(prevProps) {
    const { open, imgSrc } = this.props;
    if (open !== prevProps.open
      || imgSrc !== prevProps.imgSrc) {
      this.setState({
        open,
        imgSrc,
        filename: null,
        updatedImage: null,
        error: null,
      });
    }
  }

  setProfilePhoto = () => {
    const { filename, imgSrc } = this.state;
    if (filename && imgSrc) {
      this.setState({
        updatedImage: {
          src: imgSrc,
          filename,
        },
      }, this.closeHandler);
    }
  };

  fileSelected = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgCheck = new Image();
      imgCheck.src = e.target.result;
      imgCheck.onload = () => {
        const limit = 256;
        const iw = imgCheck.width;
        const ih = imgCheck.height;
        if (iw > limit || ih > limit) {
          const ratio = iw / ih;
          if (ratio > 1) {
            imgCheck.width = limit;
            imgCheck.height = Math.floor(limit / iw * ih);
          } else {
            imgCheck.height = limit;
            imgCheck.width = Math.floor(limit / ih * iw);
          }
        }
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = limit;
        canvas.height = limit;
        ctx.clearRect(0, 0, limit, limit);
        let left = 0;
        let top = 0;
        if (imgCheck.width < limit) {
          left = Math.floor((limit - imgCheck.width) / 2);
        }
        if (imgCheck.height < limit) {
          top = Math.floor((limit - imgCheck.height) / 2);
        }
        ctx.drawImage(imgCheck, left, top, imgCheck.width, imgCheck.height);
        const src = canvas.toDataURL('image/png');
        if (src.length < 200000) {
          // very roughly 100kB image, base64 encoded, plus headers, plus 20% margin
          // note: this is also limited on the server side
          this.setState({
            imgSrc: src,
            filename: selectedFile.name,
            error: null,
          });
        } else {
          this.setState({
            error: 'The file is too large to upload',
          });
        }
      };
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  closeHandler = () => {
    const { onClose } = this.props;
    const { updatedImage } = this.state;
    if (typeof onClose === 'function') {
      onClose(updatedImage);
    }
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      open, imgSrc, error, filename,
    } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.closeHandler}
        aria-labelledby="pp-dialog-title"
        aria-describedby="pp-dialog-description"
      >
        <DialogTitle id="pp-dialog-title">Profile photo</DialogTitle>
        <DialogContent>
          <DialogContentText id="pp-dialog-description">
            <Typography variant="caption">
            You can change your profile photo here. The profile photo is expected to be
            a 256x256 pixels image, the uploaded image will be downscaled to fit this
            restriction as needed. Maximum size is approximately 100kB. The photo must
            represent the account owner and the account owner is responsible to ensure
            it is not offensive and doesn&apos;t violate copyright.
            </Typography>
          </DialogContentText>
          {
          imgSrc ? (
            <div style={{ textAlign: 'center', margin: '15px' }}>
              <img
                ref={this.profileImageRef}
                id="profileImg"
                alt="Profile"
                src={imgSrc}
                style={{
                  maxWidth: '256px',
                  maxHeight: '256px',
                }}
              />
            </div>
          ) : null
        }
          {
          error ? (
            <Typography variant="body2" style={{ color: red[900] }}>
              {error}
            </Typography>
          ) : null
        }
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            disabled={!filename}
            onClick={this.setProfilePhoto}
          >
            Set as profile photo
          </Button>
          <label htmlFor="raised-button-file">
            <input
              accept="image/*"
              id="raised-button-file"
              type="file"
              style={{ display: 'none' }}
              onChange={this.fileSelected}
            />
            <Button component="span" color="primary">
              Upload file
            </Button>
          </label>
          <Button
            onClick={this.closeHandler}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ProfilePhoto.propTypes = {
  open: PropTypes.bool,
  imgSrc: PropTypes.string,
  onClose: PropTypes.func,
};

ProfilePhoto.defaultProps = {
  open: false,
  imgSrc: '',
  onClose: null,
};

export default ProfilePhoto;

import 'cropperjs/dist/cropper.min.css'
import Cropper from 'cropperjs';

const pillBoxer = browser => {
  const URL = window.URL,
    image = document.getElementById('image'),
    download = document.getElementById('download');

  let options = {
    aspectRatio: 1.78,
    autoCropArea: 1,
    center: false,
    guides: false,
    background: false,
    autoCrop: true,
    scalable: false,
    zoomable: false,
    dragMode: 'none',
    cropBoxMovable: false,
    cropBoxResizable: false
  };

  // Initiate Crop
  let cropper = new Cropper(image, options);
  let fileType = 'image/jpg';
  let fillColor = '#000';

  // Max dimensions for image
  const max = 2000;

  // Fits image to the aspect ratio
  document.querySelector('.btn-fit').onclick = function() {
    // Get inital crop box data
    let resizeData = {
      height: cropper.getCropBoxData().height,
      top: cropper.getCropBoxData().top,
      left: cropper.getCropBoxData().left
    };

    // Set canvas data equal to crop box data
    cropper.setCanvasData(resizeData);

    // calculate width of crop box and get difference for center
    let containerWidth = cropper.getContainerData().width,
      boxWidth = containerWidth - resizeData.left * 2,
      imageWwidth = cropper.getImageData().width;

    let dif = (boxWidth - imageWwidth) / 2;

    cropper.move(dif, 0);

    document.querySelector('.cropper-modal').style.opacity = 0;
    document.querySelector(
      '.cropper-view-box'
    ).style.backgroundColor = fillColor;
  };

  // Color background based on selection, defaults is black
  document.querySelector('.color-buttons').onclick = function(e) {
    let target = e.target;
    if (target === this) return;

    fillColor = target.getAttribute('data-fillColor');

    document.querySelector(
      '.cropper-view-box'
    ).style.backgroundColor = fillColor;
  };

  // Get cropped image
  document.querySelector('.btn-download').onclick = () => {
    if (!cropper) return;

    let options = { maxWidth: max, maxHeight: max };

    options.fillColor = fillColor;

    let result = cropper.getCroppedCanvas(options);

    if (result) {
      let fileURI = result.toDataURL(fileType);
      let subNum;

      fileType.slice(6).length == 4 ? (subNum = 23) : (subNum = 22);

      let base64str = fileURI.substring(subNum),
        decoded = atob(base64str),
        fSize = decoded.length / 1000000;

      if (fSize.toLocaleString() < 2) {
        $1('#croppedModal .modal-body').innerHTML = result;
        download.href = fileURI;
      } else if (fSize.toLocaleString() > 2 && browser == 'Firefox') {
        $1('#croppedModal .modal-body').innerHTML = result;
        download.href = fileURI;
        window.alert(`
                CAUTION:
                The file you're about to download is ${fSize.toLocaleString()} MB.

                Although Pill Boxer doesn't limit file size downloads in Firefox, you may experience a slowdown or delay in recieving your fitted image.

                Ideally, the file you download should be less than 2 MB.
                
                Proceed with caution.`);
      } else {
        let warning = $('.warning');

        warning.addClass('visible');

        warning.children(':first').addClass('animate');

        let info = document.querySelector('.popup--info');
        info.innerHTML = `
                    <p>This file is too big to download!</p>
                    <p>Chrome can't download files larger than 2 MB.</p>
                    <p>This image is <b>${fSize.toLocaleString()} MB</b>.</p>
                    <p>To download this file without restriction, try Firefox.</p>`;
      }

      console.log(
        `File size: ${(decoded.length / 1000000).toLocaleString()} MB`
      );
    }
  };

  // Image Upload
  const uploadImage = document.getElementById('uploadImage');
  const wrapper = document.querySelector('.upload-wrapper');

  if (URL) {
    uploadImage.onchange = function() {
      let files = this.files;
      ({ cropper, fileType } = imageUploader(
        cropper,
        files,
        fileType,
        image,
        options,
        download,
        max
      ));
      uploadImage.value = null;
    };
    wrapper.ondrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      let files = e.dataTransfer.files;
      ({ cropper, fileType } = imageUploader(
        cropper,
        files,
        fileType,
        image,
        options,
        download,
        max
      ));
    };
  } else {
    uploadImage.disabled = true;
    uploadImage.parentNode.className += ' disabled';
  }

  // Dragover animations
  wrapper.ondragover = e => {
    e.preventDefault();
    e.stopPropagation();
    wrapper.classList.add('is-dragover');
  };
  wrapper.ondragleave = e => {
    e.preventDefault();
    e.stopPropagation();
    wrapper.classList.remove('is-dragover');
  };

  // Reloads page on click
  document.querySelectorAll('.btn-destroy').forEach(btn => {
    btn.onclick = () => {
      window.location.reload();
    };
  });

  // Reveals how to modal
  // $('.how-to').click(e => {
  //   e.preventDefault();
  //   $('#whatsNew').modal();
  // });
};

export default pillBoxer;

function imageUploader(
  cropper,
  files,
  fileType,
  image,
  options,
  download,
  max
) {
  if (cropper && files && files.length) {
    let file = files[0];
    if (/^image\/\w+/.test(file.type)) {
      fileType = file.type;
      image.src = window.URL.createObjectURL(file);

      // Checks if image is too large
      image.onload = () => {
        if (image.naturalWidth > max || image.naturalHeight > max) {
          let warning = $('.warning');

          warning.addClass('visible');

          warning.children(':first').addClass('animate');

          let info = document.querySelector('.popup--info');

          info.innerHTML = `
                    <p>Looks like your image is too big!</p>
                    <p>This image is <b>${image.naturalWidth.toLocaleString()}px wide</b> and <b>${image.naturalHeight.toLocaleString()}px high</b>.</p>
                    <p>Please make sure it's less than ${max.toLocaleString()}px on its longest side before trying again.</p>`;

          document.querySelector('.img-container').style.display = 'none';
        }
      };

      cropper.destroy();
      cropper = new Cropper(image, options);
      download.download = `${
        fileType.slice(6).length > 3
          ? file.name.slice(-0, -5)
          : file.name.slice(-0, -4)
      }_fitted.${file.type.slice(6)}`;
      console.log(`Type: ${fileType}`);
      document.querySelectorAll('.hidden').forEach(div => {
        if (div) div.classList.remove('hidden');
      });
      document.querySelector('.upload-wrapper').classList.add('move');
      document.querySelector('.drag-text').style.display = 'none';
      // document.querySelector('.how-to').style.display = 'none';
    } else window.alert('Pleaes choose an image');
  }
  return { cropper, fileType };
}

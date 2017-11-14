import Cropper from 'cropperjs'

const pillBoxer = () => {

    const URL = window.URL,
          image = document.getElementById('image'),
          download = document.getElementById('download')

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
    }

    // Initiate Crop
    let cropper = new Cropper(image, options),
        fileType = 'image/jpg',
        fillColor = '#000';

    // Fits image to the aspect ratio
    document.querySelector('.btn-fit').onclick = function() {

        // Get inital crop box data
        let resizeData = {
            height: cropper.getCropBoxData().height,
            top: cropper.getCropBoxData().top,
            left: cropper.getCropBoxData().left
        }

       // Set canvas data equal to crop box data
       cropper.setCanvasData(resizeData)

       // calculate width of crop box and get difference for center
       let containerWidth = cropper.getContainerData().width,
           boxWidth = containerWidth - (cropper.getCropBoxData().left * 2),
           imageWwidth = cropper.getImageData().width

       let dif = (boxWidth - imageWwidth) / 2
       
       cropper.move(dif, 0)

       document.querySelector('.cropper-modal').style.opacity = 0;
       document.querySelector('.cropper-view-box').style.backgroundColor = fillColor;

    }

    // Color background based on selection, defaults is black
    document.querySelector('.color-buttons').onclick = function(e) {
        let target = e.target;
        if (target === this) return

        fillColor = target.getAttribute('data-fillColor')

        document.querySelector('.cropper-view-box').style.backgroundColor = fillColor;

        let options =  {
            maxWidth: 3000,
            maxHeight: 3000,
            fillColor: fillColor
        }

        let result = cropper.getCroppedCanvas(options)
        if (result) download.href = result.toDataURL(fileType);


    }

    // Get new image
    document.querySelector('.btn-download').onclick = e => {
        let target = e.target,
            result;

        if (!cropper) return

        let options = target.getAttribute('data-option')

        try {
            options = JSON.parse(options);
        } catch (e) {
            console.log(e.message);
        }

        options.fillColor = fillColor;

        result = cropper.getCroppedCanvas(options)

        if (result) {
            $('#croppedModal').modal().find('.modal-body').html(result);
            download.href = result.toDataURL(fileType);
        }
    }

    // Image Upload
    const uploadImage = document.getElementById('uploadImage');

    if (URL) {
        uploadImage.onchange = function() {
            let files = this.files;
            ({ cropper, fileType } = imageUploader(cropper, files, fileType, image, options, download));
            uploadImage.value = null;
        };
        
    } else {
        uploadImage.disabled = true;
        uploadImage.parentNode.className += ' disabled';
    }

    const wrapper = document.querySelector('.upload-wrapper');

    wrapper.ondrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        let files = e.dataTransfer.files;

        ({ cropper, fileType } = imageUploader(cropper, files, fileType, image, options, download));
    }

    wrapper.ondragover = e => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.add('is-dragover')
    }

    wrapper.ondragleave = e => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.remove('is-dragover')
    }

    document.querySelector('.btn-destory').onclick = () => {
        window.location.reload()
    }

}

export default pillBoxer

function imageUploader(cropper, files, fileType, image, options, download) {
    if (cropper && files) {
        let file = files[0]
        if (/^image\/\w+/.test(file.type)) {
            fileType = file.type;
            image.src = window.URL.createObjectURL(file);
            cropper.destroy();
            cropper = new Cropper(image, options);
            download.download = `${fileType.slice(6).length > 3 ? file.name.slice(-0, -5) : file.name.slice(-0, -4)}_fitted.${file.type.slice(6)}`;
            document.querySelectorAll('.hidden').forEach(div => {
                if (div)
                    div.classList.remove('hidden');
            });
            document.querySelector('.upload-wrapper').classList.add('move');
            document.querySelector('.drag-text').style.display = "none";
        }
        else window.alert('Pleaes choose an image');
        
    }
    return { cropper, fileType };
}


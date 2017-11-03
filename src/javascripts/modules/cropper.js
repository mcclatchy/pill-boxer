import Cropper from 'cropperjs'

const cropStart = () => {

    const URL = window.URL || window.webkitURL

    let image = document.getElementById('image')
    let download = document.getElementById('download');

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
        uploadedType = 'image/jpg',
        fillColor = '#000';

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

       let dif = boxWidth - imageWwidth
       
       cropper.move(dif / 2, 0)

       document.querySelector('.cropper-modal').style.opacity = 0;
       document.querySelector('.cropper-view-box').style.backgroundColor = fillColor;


    }

    // Color background based on selection, defaults is black
    document.querySelector('.color-buttons').onclick = function(e) {
        let target = e.target;
        if (target === this) return

        fillColor = target.getAttribute('data-fillColor')

        document.querySelector('.cropper-view-box').style.backgroundColor = fillColor;

    }

    // Get new image
    document.querySelector('.btn-download').onclick = e => {
        let target = e.target,
            result,
            data;

        if (!cropper) return

        data = {
            method: target.getAttribute('data-method'),
            option: target.getAttribute('data-option') || undefined
        }

        try {
            data.option = JSON.parse(data.option);
        } catch (e) {
            console.log(e.message);
        }

        data.option.fillColor = fillColor;

        result = cropper[data.method](data.option)

        if (result) {
            $('#croppedModal').modal().find('.modal-body').html(result);
            download.href = result.toDataURL(uploadedType);
        }

    }

    // Image Upload
    let uploadImage = document.getElementById('uploadImage'),
        uploadedURL;

    if (URL) {
        uploadImage.onchange = function(e) {
            let files = this.files
           
            if (cropper && files) {
                let file = files[0]

                if (/^image\/\w+/.test(file.type)) {
                    uploadedType = file.type
    
                    if (uploadedURL) URL.revokeObjectURL(uploadedURL)

                    image.src = uploadedURL = URL.createObjectURL(file)

                    cropper.destroy()
                    cropper = new Cropper(image, options)

                    uploadImage.value = null
                    
                    download.download = file.name

                    document.querySelectorAll('.hidden').forEach(div => {if(div) div.classList.remove('hidden')})
                    document.querySelector('.upload-wrapper').classList.add('move')
                    
                } else {
                    window.alert('Pleaes choose an image')
                }
            }
        };
    } else {
        uploadImage.disabled = true;
        uploadImage.parentNode.className += ' disabled';
    }


}

export default cropStart
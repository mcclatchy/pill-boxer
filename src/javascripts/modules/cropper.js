import Cropper from 'cropperjs'

const cropStart = () => {

    const URL = window.URL || window.webkitURL

    let image = document.getElementById('image')
    let download = document.getElementById('download');

    let options = {
        aspectRatio: 1.78,
        autoCropArea: 1,
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

    document.querySelector('[data-method="fitImage"]').onclick = function() {

        let resize = {
            height: cropper.getCropBoxData().height,
            top: cropper.getCropBoxData().top,
            left: cropper.getCropBoxData().left
        }

       cropper.setCanvasData(resize)

       let containerW = cropper.getContainerData().width
       let boxWidth = containerW - (cropper.getCropBoxData().left * 2) 
       let imageW = cropper.getImageData().width

       let dif = boxWidth - imageW
       cropper.move(dif / 2, 0)

       document.querySelector('.cropper-modal').style.opacity = 0;
       document.querySelector('.cropper-view-box').style.backgroundColor = fillColor;


    }

    document.querySelector('.color-buttons').onclick = e => {
        let target = e.target;
        fillColor = target.getAttribute('data-fillColor')

        document.querySelector('.cropper-view-box').style.backgroundColor = fillColor;

    }

    // Get new image
    document.querySelector('.btn-download').onclick = function(event) {
        let e = event || window.event,
            target = e.target || e.srcElement,
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
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
            
            download.href = result.toDataURL(uploadedType);
        }

    }

    // Image Upload
    let uploadImage = document.getElementById('uploadImage'),
        uploadedURL;

    if (URL) {
        uploadImage.onchange = function() {
            let files = this.files
           
            if (cropper && files) {
                let file = files[0]

                if (/^image\/\w+/.test(file.type)) {
                    uploadedType = file.type
                    
                    if (uploadedURL) {
                        URL.revokeObjectURL(uploadedURL)
                    }
                    image.src = uploadedURL = URL.createObjectURL(file)
                    cropper.destroy()
                    cropper = new Cropper(image, options)
                    uploadImage.value = null
                    let steps = document.querySelector('.hidden') || undefined
                    if (steps) steps.classList.remove('hidden')
                    
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
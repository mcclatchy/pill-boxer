<script>

    function handleChange(params) {
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
    }

</script>


<div class="upload-wrapper text-center">
    <h3>Step 1.</h3>
    <i class="fa fa-upload fa-5x" aria-hidden="true"></i>
    <br>
    <label class="btn btn-lg btn-upload" for="uploadImage" title="Upload image">
      <input type="file" class="sr-only" id="uploadImage" name="file" accept=".jpg, .jpeg, .gif, .bmp, .png">
      <span>Upload image</span>
    </label>
    <br>
    <span class="drag-text">or drag it here</span>
  </div> 
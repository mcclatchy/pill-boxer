<script>
  export let image;
  export let fileType;

  function handleUpload(e) {
    console.log(e);
    let file;
    if (e.dataTransfer) {
      console.log("Is drop");
      file = e.dataTransfer.files[0];
    } else {
      file = e.target.files[0];
    }
    fileType = file.type;
    image = URL.createObjectURL(file);
  }
</script>

<div class="upload-wrapper text-center" on:drop|preventDefault|stopPropagation={handleUpload} on:dragover|preventDefault|stopPropagation on:dragleave|preventDefault|stopPropagation>
  <h3>Step 1.</h3>
  <i class="fa fa-upload fa-5x" aria-hidden="true" />
  <br />
  <label class="btn btn-lg btn-upload" for="uploadImage" title="Upload image">
    <input
      type="file"
      class="sr-only"
      id="uploadImage"
      name="file"
      accept=".jpg, .jpeg, .gif, .bmp, .png"
      on:change={handleUpload}
    />
    <span>Upload image</span>
  </label>
  <br />
  <span class="drag-text">or drag it here</span>
</div>

<style>
  .upload-wrapper {
    width: 60%;
    outline: 2px dashed green;
    outline-offset: -10px;
    margin-top: 10%;
    transition: margin-top 0.25s, outline-offset 0.15s ease-in-out;
    padding: 5%;
    background-color: rgba(49, 180, 95, 0.2);
    margin-left: auto;
    margin-right: auto;
  }
</style>

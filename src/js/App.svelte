<script>
  import 'cropperjs/dist/cropper.min.css';
  import Cropper from 'cropperjs';
  
  import Uploader from './components/Uploader.svelte';

  // import pillBoxer from './modules/pillboxer';

  let image;
  let fileType;
  let cropper;

  let imgBlob;
  let fileName;

  // Bool to determined if "fit image" has been clicked
  let isFitted = false;

  function initCropper(node, _imgSrc) {
    cropper = new Cropper(node, {
      aspectRatio: 16 / 9,
      autoCropArea: 1,
      center: false,
      guides: false,
      background: false,
      autoCrop: true,
      scalable: false,
      zoomable: false,
      dragMode: 'none',
      cropBoxMovable: false,
      cropBoxResizable: false,
      minCropBoxHeight: 400,
      modal: false,
      highlight: false,
      rotatable: false,
    });

    return {
      update(imgSrc) {
        cropper.replace(imgSrc);
      },
      destroy() {
        cropper.destroy();
      },
    };
  }

  function fitImage() {
    let resizeData = {
      height: cropper.getCropBoxData().height,
      top: cropper.getCropBoxData().top,
      left: cropper.getCropBoxData().left,
    };

    // Set canvas data equal to crop box data
    cropper.setCanvasData(resizeData);

    // calculate width of crop box and get difference for center
    // let containerWidth = cropper.getContainerData().width;

    let { width } = cropper.getCropBoxData();

    console.log(width);

    let imgWidth = cropper.getImageData().width;

    console.log(imgWidth);

    let dif = (width - imgWidth) / 2;

    cropper.move(dif, 0);

    isFitted = true;

    handleDownload();
  }

  function handleDownload() {
    const max = 4096;
    let options = {
      maxWidth: max,
      maxHeight: max,
      fillColor: '#000',
    };
    const result = cropper.getCroppedCanvas(options);
    if (result) {
      // imgBlob = result.toDataURL(fileType);
      result.toBlob((blob) => {
        imgBlob = URL.createObjectURL(blob);
      });
    }
  }
</script>

<Uploader bind:image bind:fileType bind:fileName />

{#if image}
  <div class="container mx-auto bg-white shadow-lg rounded p-6 max-w-4xl">
    <div class="img-container">
      <img
        class="max-w-full"
        src={image}
        alt="User-uploaded file to be cropped"
        use:initCropper={image}
      />
    </div>

    <div class="button-wrapper mx-auto flex flex-col justify-center items-center mt-8 space-x-4">
      <span class="step-span">Step 2</span>
      <button
        on:click={fitImage}
        class="bg-indigo-500 transition hover:bg-indigo-700 text-white rounded-lg py-2 px-5 text-xl shadow"
        ><i class="uil uil-compress-lines mr-1"/>Fit image</button
      >

      <span class="step-span mt-6">Step 3</span>
      <button class="bg-indigo-600 transition hover:bg-indigo-800 text-white disabled:opacity-50 disabled:bg-gray-400 py-2 px-5 text-xl rounded-lg shadow" disabled={!isFitted && !imgBlob} autocomplete="off">
        {#if isFitted && imgBlob}
          <a href={imgBlob} download="test_{fileName}"><i class="uil uil-image-download mr-1"></i>Download</a>
        {:else}
        <i class="uil uil-image-download mr-1"></i>Download
        {/if}
      </button>
    </div>
  </div>
{/if}

<style>
  .img-container {
    min-height: 500px;
    max-height: 500px;
    margin: 0 auto;
  }
  :global(.cropper-crop-box) {
    background-color: #000;
  }
  :global(.cropper-view-box) {
    outline-color: rgb(165 180 252);
    outline-width: 2px;
  }
  .step-span {
      @apply text-xl font-bold mb-1;
  }
</style>

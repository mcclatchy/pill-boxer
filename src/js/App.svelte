<script>
  import 'cropperjs/dist/cropper.min.css';
  import Cropper from 'cropperjs';

  import Uploader from './components/Uploader.svelte';

  // import pillBoxer from './modules/pillboxer';

  let image = null;
  let fileType = null;
  let cropper;

  let imgBlob;
  let fileName = null;
  let fittedFileName = '';

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
        if (imgBlob) {
          console.log('Reovking URL blob from update');
          URL.revokeObjectURL(imgBlob);
        }
      },
      destroy() {
        cropper.destroy();
        if (imgBlob) {
          console.log('Revoking URL blob');
          URL.revokeObjectURL(imgBlob);
        }
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

    let { width } = cropper.getCropBoxData();
    let imgWidth = cropper.getImageData().width;

    // Calculates centering based on width of the 16:9 frame crop minus the image width (practical not actual)
    let dif = (width - imgWidth) / 2;

    cropper.move(dif, 0);

    isFitted = true;

    handleDownload();

    let fileExtension = fileType.slice(6);
    let isJpeg = fileExtension.length > 3; // jpeg vs jpg file checker

    fittedFileName = `${
      isJpeg ? fileName.slice(0, -5) : fileName.slice(0, -4)
    }_fitted.${fileExtension}`;
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
      result.toBlob(blob => {
        imgBlob = URL.createObjectURL(blob);
      }, fileType);
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

    <div
      class="button-wrapper mx-auto flex flex-col justify-center items-center mt-8"
    >
      <span class="step-span">Step 2</span>
      <button
        on:click={fitImage}
        class="bg-indigo-500 transition hover:bg-indigo-700 text-white rounded-lg py-2 px-5 text-xl shadow"
        ><i class="uil uil-compress-lines mr-1" />Fit image</button
      >

      <span class="step-span mt-6">Step 3</span>
      <button
        class="download-btn bg-indigo-600 transition hover:bg-indigo-800 text-white disabled:opacity-50 disabled:bg-gray-400 text-xl rounded-lg shadow"
        disabled={!isFitted && !imgBlob}
        autocomplete="off"
      >
      <!-- An {#if} statement is used because anchor tags cannot have empty an href attribute to meet a11y standards. This ensures the anchor link to download the image only exists when the fitted image can be downloaded. -->
        {#if isFitted && imgBlob}
          <a href={imgBlob} download={fittedFileName}
            ><i class="uil uil-image-download mr-1" />Download</a
          >
        {:else}
          <span><i class="uil uil-image-download mr-1" />Download</span>
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
    outline-color: rgb(165, 180, 252);
    outline-width: 2px;
  }
  .step-span {
    @apply text-xl font-bold mb-1;
  }
  .download-btn > * {
    @apply px-5 py-2 inline-block;
  }
</style>

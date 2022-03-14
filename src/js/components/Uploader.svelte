<script>
  export let image;
  export let fileType;
  export let fileName;

  let isDragged;

  function handleUpload(e) {
    let file;
    if (e.dataTransfer) {
      file = e.dataTransfer.files[0];
    } else {
      file = e.target.files[0];
    }
    if (/^image\/\w+/.test(file.type)) {
      fileType = file.type;
      fileName = file.name;
      image = URL.createObjectURL(file);
    } else {
      window.alert('Please choose an image.');
    }
  }
</script>

{#if !image}
  <div
    class="upload-wrapper"
    class:is-dragover={isDragged}
    on:drop|preventDefault|stopPropagation={handleUpload}
    on:dragover|preventDefault|stopPropagation={() => (isDragged = true)}
    on:dragleave|preventDefault|stopPropagation={() => (isDragged = false)}
  >
    <h3 class="text-2xl font-bold mt-6">Step 1</h3>
    <i class="uil uil-upload text-6xl inline-block text-emerald-500" />
    <label for="uploadImage" title="Upload image">
      <input
        type="file"
        class="sr-only"
        id="uploadImage"
        name="file"
        accept=".jpg, .jpeg, .gif, .bmp, .png"
        on:change={handleUpload}
      />
      <span
        class="bg-emerald-500 py-2 px-4 rounded-lg text-white text-2xl mb-2 block cursor-pointer transition hover:bg-emerald-700"
        >Upload image</span
      >
      <span class="drag-text block">or drag it here</span>
    </label>
    <br />
  </div>
{/if}

{#if image}
  <div
    class="mini-uploader container mx-auto flex flec-col items-center justify-center text-center mt-16 mb-5"
  >
    <label for="uploadImage" title="Upload image">
      <input
        type="file"
        class="sr-only"
        id="uploadImage"
        name="file"
        accept=".jpg, .jpeg, .gif, .bmp, .png"
        on:change={handleUpload}
      />
      <span
        class="bg-emerald-500 py-2 px-4 rounded-lg text-white text-lg block cursor-pointer transition hover:bg-emerald-600 shadow-lg"
        ><i class="uil uil-upload text-xl mr-1" />Upload image</span
      >
    </label>
  </div>
{/if}

<style>
  .upload-wrapper {
    @apply transition-all text-center container mx-auto bg-white mt-20 max-w-2xl shadow-lg rounded p-4 h-96 flex flex-col items-center justify-between outline-dashed outline-transparent outline-2;
    outline-offset: 0px;
  }
  .upload-wrapper.is-dragover {
    @apply shadow-xl bg-emerald-100 outline-emerald-700;
    outline-offset: -15px;
  }
</style>

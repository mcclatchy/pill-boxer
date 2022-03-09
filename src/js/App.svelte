<script>
    // import { onMount } from 'svelte';
    // import Cropper from "./components/Cropper.svelte";
    // import Downloader from "./components/Downloader.svelte";
    import Uploader from "./components/Uploader.svelte";

    // import pillBoxer from './modules/pillboxer';

    let image;
    let fileType;

</script>

<Uploader bind:image bind:fileType/>

{#if image}
    <img src="{image}" alt="User-uploaded file to be cropped"/>
    <p>{fileType}</p>
{/if}

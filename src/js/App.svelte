<script>
    import { onMount } from 'svelte';
    import Cropper from "./components/Cropper.svelte";
    import Downloader from "./components/Downloader.svelte";
    import Uploader from "./components/Uploader.svelte";

    import pillBoxer from './modules/pillboxer';

    let browser = navigator.sayswho;
    let browserAllowed = ['Chrome', 'Firefox'].includes(browser)

    onMount(() => {
        pillBoxer(browser);
    })

</script>

{#if browserAllowed }
<Uploader />
<Cropper />
<Downloader />
{:else}
<h1 class="browser-fallback">Please switch Chrome or Firefox to use this app.</h1>
{/if}

<style>
    .browser-fallback {
        text-align: center;
    }
</style>

import './modules/sayswho';
import './modules/bling';
import App from './App.svelte';

new App({
    target: $1('#app')
})


// if (navigator.sayswho == "Chrome" || navigator.sayswho == "Firefox") {
//     let browser = navigator.sayswho;
//     window.onload = pillBoxer(browser);
// }
// else {
//     document.querySelector('.upload-wrapper').remove()
//     const browserCatch = document.createElement('div')
//     const appContainer = document.querySelector('.container');
//     browserCatch.className = "alert alert-danger text-center w-50 center"
//     browserCatch.style.margin = "auto"
//     browserCatch.innerHTML = `
//     <h4 class="alert-heading"><i class="fa fa-frown-o fa-lg" aria-hidden="true"></i></h4>
//     <p>Looks like you're using a non-supported browser.</p>
//     <p>Please switch to Chrome or Firefox to use this tool.</p>`
//     appContainer.insertBefore(browserCatch, appContainer.firstChild)
// }
import { harvestBtn, textarea, uploader, dropBox, tryagainBtn } from './selectors';
import harvest from './harvest';
import { renderInfo, renderResults, renderReset } from './render';

let files;
let harvested;

harvestBtn.addEventListener('click', () => {
    if (harvested) {
        return;
    }

    if (files) {
        const promises = [].map.call(files, (file) => new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = (evt) => {
                resolve(evt.target.result);
            };
        }));
        Promise.all(promises)
            .then((result) => {
                renderResults(harvest(result.join()));
                harvested = true;
            });
    } else if (textarea.value !== '') {
        renderResults(harvest(textarea.value));
        harvested = true;
    }

    harvestBtn.style.cursor = 'default';
    harvestBtn.disabled = true;
});

textarea.addEventListener('keyup', (evt) => {
    if (evt.target.value === '') {
        harvestBtn.style.cursor = 'default';
        harvestBtn.disabled = true;
    } else {
        harvestBtn.style.cursor = 'pointer';
        harvestBtn.disabled = false;
    }
});

uploader.addEventListener('change', (evt) => {
    files = evt.target.files;
    renderInfo(files);
});

dropBox.addEventListener('drop', (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    files = evt.dataTransfer.files;
    renderInfo(files);
});

dropBox.addEventListener('dragover', (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';

    if (!dropBox.classList.contains('-dragover')) {
        dropBox.classList.add('-dragover');
    }
});

dropBox.addEventListener('dragleave', (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    if (dropBox.classList.contains('-dragover')) {
        dropBox.classList.remove('-dragover');
    }
});

tryagainBtn.addEventListener('click', () => {
    harvested = false;
    files = null;

    /**
     * "Refreshes" the uploader so the `change` event continues
     * to work for the same file.
     */
    uploader.value = '';
    renderReset();
});

// https://webpack.github.io/docs/hot-module-replacement.html
if (module.hot) {
    module.hot.accept();
}

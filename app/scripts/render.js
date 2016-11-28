import prettyBytes from 'pretty-bytes';
import { txtSvg, htmlSvg, otherSvg } from './svg';
import { txtContainer, textarea, dropZone, dropBox, resultsNa, resultsContainer, tryagain, harvestBtn } from './selectors';

const svg = {
    'text/plain': txtSvg,
    'text/html': htmlSvg,
    'text/javascript': otherSvg,
};

const regexpr = {
    'text/plain': /.txt$/,
    'text/html': /.html$/,
};

export function renderInfo(files) {
    let dropInfo = '';
    [].forEach.call(files, (file) => {
        const type = file.type;
        dropInfo += `
        <div class="dropzone__info">
            ${svg[type]}
            <div>${file.name.replace(regexpr[type], '')}</div>
            <div>${prettyBytes(file.size)}</div>
        </div>
        `;
    });

    txtContainer.style.display = 'none';
    dropBox.style.display = 'none';
    harvestBtn.style.cursor = 'pointer';
    harvestBtn.disabled = false;

    dropZone.insertAdjacentHTML('beforeend', dropInfo);
}

export function renderResults(result) {
    resultsNa.style.display = 'none';
    let resultLinks = '';
    let resultEmail = '';

    if (result.links.length === 0) {
        resultLinks = `<li>Nothing Available.</li>`;
    } else {
        result.links.forEach(({ linkText, url }) => {
            resultLinks += `<li>${linkText} <a href=${url}>${url}</a></li>`;
        });
    }

    if (result.emailAddresses.length === 0) {
        resultEmail = `<li>Nothing Available.</li>`;
    } else {
        result.emailAddresses.forEach((email) => {
            resultEmail += `<li><a href="mailto:${email}">${email}</a></li>`;
        });
    }

    const linksHTML = `
    <div class="results__links">
        <div class="links--header">Links</div>
        <ol class="links--list">
            ${resultLinks}
        </ol>
    </div>
    `;

    const emailHTML = `
    <div class="results__email">
        <div class="email--header">Emails</div>
        <ul class="email--list">
            ${resultEmail}
        </ul>
    </div>
    `;

    resultsContainer.innerHTML = `${linksHTML}${emailHTML}`;
    tryagain.style.display = 'block';
}

export function renderReset() {
    txtContainer.style.display = 'block';

    textarea.value = '';

    dropBox.style.display = 'flex';

    [].forEach.call(document.querySelectorAll('.dropzone__info'), (el) => {
        dropBox.parentNode.removeChild(el);
    });

    resultsContainer.innerHTML = '<div class="results__na">Please harvest a file or text before proceeding.</div>';

    tryagain.style.display = 'none';

    if (dropBox.classList.contains('-dragover')) {
        dropBox.classList.remove('-dragover');
    }
}

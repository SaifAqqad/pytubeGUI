let urlPattern = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

function setUrl() {
    let url = document.getElementById('url_input');
    if (!urlPattern.test(url.value)) {
        notify('Invalid URL');
        url.value = "";
        return false;
    }
    pywebview?.api?.set_video?.(url.value);
    return true;
}

function onDownload() {
    if(pywebview?.api?.is_busy()){
        notify("Wait for download to finish")
    }
    if (!setUrl())
        return
    let itag = document.getElementById('quality_select');
    pywebview?.api?.download?.(itag.value);
}

function onFetchQualities() {
    if(!setUrl()){

    }
    //let qlist = pywebview?.api?.;
}

function onURLChange() {
    document.getElementById('quality_select').children.length = 1;
}

function hideProgress() {
    document.getElementById('prog_elem').classList.add('hidden');
}

//called from py

function updateProgress(prog) {
    let progElem = document.getElementById('prog_elem');
    progElem.classList.remove(hidden);
    progElem.value = prog;
}

function onDownloadCompleted(file) {
    notify(`Video downloaded:\n${file}`);
    hideProgress();
}
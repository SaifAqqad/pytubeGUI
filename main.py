import webview
from pathlib import Path
from pytube import Youtube,extract

window = None


class Downloader:
    download_path = str(Path.home() / "Downloads")
    curr_url = None
    video = None
    busy = False

    def set_video(self, vurl):
        if bool(self.video) and self.video.video_id == extract.video_id(vurl)  :
            return
        self.curr_url = vurl
        self.video = Youtube(vurl)
        self.video.register_on_progress_callback(self.update_progress)
        self.video.register_on_complete_callback(self.on_download_completed)
        
    def download(self, itag):
        if self.busy:
            return False
        stream = self.video.streams.get_by_itag(itag)
        if bool(stream):
            stream.download(self.download_path, skip_existing=False)

    def update_progress(self, stream, chunk, bytes_remaining):
        self.busy = True
        total_size = stream.filesize
        bytes_downloaded = total_size - bytes_remaining
        percentage_of_completion = bytes_downloaded / total_size * 100
        window.evaluate_js("updateProgress({progress});".format(
            progress=percentage_of_completion))

    def on_download_completed(self, stream, file_path):
        window.evaluate_js("onDownloadCompleted({fp})".format(fp = file_path))
        return

    def is_busy(self):
        return self.busy

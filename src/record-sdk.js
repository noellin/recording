import Recorder from "./recorder";
export default class Record {
  startRecord(param) {
    let self = this;
    try {
      Recorder.get(rec => {
        if (rec.error) return param.error(rec.error);
        self.recorder = rec;
        self.recorder.start();
        param.success("開始錄音");
      })
    } catch (e) {
      param.error("開始錄音失敗" + e);
    }
  }

  stopRecord(param) {
    let self = this;
    try {
      let blobData = self.recorder.getBlob();
      param.success(blobData);
    } catch (e) {
      param.error("結束錄音失敗" + e);
    }
  }

  play(audio) {
    let self = this;
    try {
      self.recorder.play(audio);
    } catch (e) {
      console.error("錄音播放失敗" + e);
    }
  }

  clear(audio) {
    let self = this;
    try {
      self.recorder.clear(audio);
    } catch (e) {
      console.error("清除錄音失敗" + e);
    }
  }
}

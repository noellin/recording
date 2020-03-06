<template>
  <div>
    <div class="record col-sm-12 my-1">
      <div id="clock" class="col-sm-12  ">
        <p class="time justify-content-conter d-flex">{{ time }}</p>
        <!-- <p class="text justify-content-conter d-flex">
          DIGITAL CLOCK with Vue.js
        </p> -->
      </div>
      <div class="col-sm-12 justify-content-center align-items-center d-flex">
        <h1>{{ tipMsg }}</h1>
      </div>
      <div class="col-sm-12 justify-content-center d-flex">
        <button
          @click="
            onStartVoice();
            startTime();
          "
          class="btn btn-primary mx-1"
          type="button"
        >
          {{ $t("message.Start") }}
        </button>
        <button
          @click="
            onEndVoice();
            resetTime();
          "
          class="btn btn-primary mx-1"
          type="button"
        >
          {{ $t("message.Stop") }}
        </button>
        <button @click="onPlayAudio" class="btn btn-primary mx-1" type="button">
          {{ $t("message.Play") }}
        </button>
        <button
          class="btn btn-info mx-1"
          type="button"
          data-toggle="modal"
          data-target="#langModal"
        >
          {{ $t("message.Change_Language") }}
        </button>
      </div>
      <div
        class="record-play col-sm-12 justify-content-center d-flex "
        v-show="isFinished"
      >
        <h2 class="col-sm-12">Current voice player is:</h2>
      </div>
      <div
        class="record-play col-sm-12 justify-content-center d-flex "
        v-show="isFinished"
      >
        <audio id="audioVoice" controls autoplay class="col-sm-12"></audio>
      </div>
    </div>
    <div
      class="modal fade"
      id="langModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="langModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <!-- <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> -->
          <div class="modal-body px-1 py-1">
            <div class="col-sm-12 mb-2" style="height:20px;">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="col-sm-12 lang-title mb-4">語言/Language</div>
            <div class="col-sm-12 justufy-content-start px-4">
              <ul class=" p-0">
                <li
                  class="lang-li mb-3"
                  @click="(lang = 'th'), onChangeLang"
                  :class="{ 'lang-color': lang === 'th' }"
                >
                  ไทย
                </li>
                <li
                  class="lang-li mb-3"
                  @click="(lang = 'my'), onChangeLang"
                  :class="{ 'lang-color': lang === 'my' }"
                >
                  ဗမာ
                </li>
                <li
                  class="lang-li mb-3"
                  @click="(lang = 'en-US'), onChangeLang"
                  :class="{ 'lang-color': lang === 'en-US' }"
                >
                  English
                </li>
              </ul>
            </div>
            <div class="align-items-end d-flex justify-content-center my-2">
              <button
                type="button"
                class="btn btn-md btn-primary lang-button"
                data-dismiss="modal"
                @click="$i18n.locale = lang"
              >
                {{ $t("message.Yes") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Record from "../record-sdk";
export default {
  data() {
    return {
      isVoice: false,
      isFinished: false,
      tipMsg: "recording",
      audio: "",
      lang: "en-US",
      time: "",
      timerID: {},
      timer: 0,
      timerblock: true,
      recorder: new Record()
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {},
  methods: {
    startTime() {
      this.timer = 0;
      if (this.timerblock) {
        console.log("fe");
        this.timerID = setInterval(this.updateTime, 1000);
        this.timerblock = false;
      }
    },
    resetTime() {
      console.log("bb");
      window.clearInterval(this.timerID);
      this.timerblock = true;
    },
    updateTime() {
      this.timer++;
      var cd = new Date();
      this.time =
        this.zeroPadding(0, 2) +
        ":" +
        this.zeroPadding(0, 2) +
        ":" +
        this.zeroPadding(this.timer, 2);
    },

    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    // 开始录音
    onStartVoice() {
      this.onStopAudio();
      this.isFinished = false;
      this.recorder.startRecord({
        success: res => {
          this.isVoice = true;
        },
        error: e => {
          this.isVoice = false;
          this.$toast(e);
        }
      });
    },

    // 结束录音
    onEndVoice() {
      this.isFinished = false;
      this.recorder.stopRecord({
        success: res => {
          this.isVoice = false;
          //此处可以获取音频源文件(res)，用于上传等操作
          console.log("音源文件", res);
        },
        error: e => {
          this.isVoice = false;
        }
      });
    },

    // 播放录音
    onPlayAudio() {
      this.isVoice = false;
      this.isFinished = true;
      this.audio = document.getElementById("audioVoice");
      this.recorder.play(this.audio);
    },

    // 停止播放录音
    onStopAudio() {
      this.recorder.clear(this.audio);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lang-color {
  color: #1e88a8;
}
.lang-li {
  cursor: pointer;
  font-size: 20px;
}
.lang-title {
  font-size: 20px;
}
.lang-button {
  width: 260px;
}
// time
#clock {
  font-family: "Share Tech Mono", monospace;
  color: #ffffff;

  color: #daf6ff;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
#clock .time {
  letter-spacing: 0.05em;
  font-size: 80px;
  padding: 5px 0;
}
</style>

import { BaseComponent } from "../../templates/basecomponent";
import { App } from "../../app/app";
import { Component } from "../../templates/components";

export class Player extends Component {
  progressBar: BaseComponent;
  playerContainer: BaseComponent;
  player: BaseComponent;
  infoBlock: BaseComponent;
  likeBlock: BaseComponent;
  panel: BaseComponent;
  sound: BaseComponent;
  playOrPauseBlock: BaseComponent;
  previous: BaseComponent;
  next: BaseComponent;
  volume: BaseComponent;
  volumeWrapp: BaseComponent;
  wrapperForPanel: BaseComponent;
  audio: HTMLAudioElement = new Audio();
  audioUrl: string | null = localStorage.getItem("currentTrackUrl");
  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.playerContainer = new BaseComponent("div", "player__container");
    this.progressBar = new BaseComponent("div", "progress");
    this.player = new BaseComponent("div", "player");
    this.infoBlock = new BaseComponent("div", "player__info-block");
    this.likeBlock = new BaseComponent("div", "player__like");
    this.panel = new BaseComponent("div", "player__panel");
    this.sound = new BaseComponent("div", "player__sound");
    this.playOrPauseBlock = new BaseComponent("div", "panel__btn", "", "play");
    this.previous = new BaseComponent("div", "panel__btn", "", "previos");
    this.next = new BaseComponent("div", "panel__btn", "", "next");
    this.volume = new BaseComponent("input", "player__volume", "", "volume");
    this.wrapperForPanel = new BaseComponent("div", "player__panel-wrap");
    this.volumeWrapp = new BaseComponent("div", "player__volume");
    if (this.audioUrl) this.audio = new Audio(this.audioUrl);
  }

  public render(): HTMLElement {
    this.createPlayer();

    this.player.element.append(this.progressBar.element);
    this.player.element.append(this.wrapperForPanel.element);
    this.playerContainer.element.append(this.player.element);
    this.container.append(this.playerContainer.element);

    this.soundEvents();

    return this.container;
  }

  private createPlayer(): void {
    this.createInfoBlock();
    this.createProgress();
    this.createLikeBlock();
    this.createPanelBlock();
    this.createSoundBlock();
    this.wrapperForPanel.element.append(this.infoBlock.element);
    this.wrapperForPanel.element.append(this.likeBlock.element);
    this.wrapperForPanel.element.append(this.panel.element);
    this.wrapperForPanel.element.append(this.sound.element);
    this.changeProgress();
    this.uploadProgress();
    this.startTrack();
    this.changeVolume();
    this.volumeBtnEvents();
  }

  private createProgress(): void {
    localStorage.setItem("sound", "on");
    const progressBar = document.createElement("div") as HTMLElement;
    progressBar.className = "progress__bar";
    this.progressBar.element.append(progressBar);
  }

  private createInfoBlock(): void {
    this.infoBlock.element.classList.add("info-block");
    const imageBlock = document.createElement("div") as HTMLElement;
    const aboutBlock = document.createElement("div") as HTMLElement;
    aboutBlock.className = "info-block__about-wrapp";
    imageBlock.className = "info-block__image";
    aboutBlock.innerHTML = `
                            <span class="info-block__song-name">Yamakasi</span>
                            <div class="info-block__author">Miyagi</div>
    `;
    imageBlock.innerHTML = `<img src="https://avatars.yandex.net/get-music-content/2358262/410e8a7a.a.11322908-1/m1000x1000" alt="">`;
    this.infoBlock.element.append(imageBlock);
    this.infoBlock.element.append(aboutBlock);
  }

  private createLikeBlock(): void {
    let src: string = "../../assets/images/noLike.svg";
    const likeImg: HTMLImageElement = document.createElement("img");
    likeImg.src = src;
    this.likeBlock.element.append(likeImg);
    this.likeBlock.element.addEventListener("click", () => {
      src = "../../assets/images/like.svg";
      likeImg.src = src;
    });
  }

  private createPanelBlock(): void {
    this.playOrPauseBlock.element.classList.add("pause");
    let srcPauseOrPlay: string = `<img src="../../assets/images/panel/play.svg" alt="#">`;

    this.previous.element.innerHTML = `<img src="../../assets/images/panel/previos.svg" alt="#">`;
    this.playOrPauseBlock.element.innerHTML = srcPauseOrPlay;
    this.next.element.innerHTML = `<img src="../../assets/images/panel/next.svg" alt="#">`;

    this.panel.element.append(this.previous.element);
    this.panel.element.append(this.playOrPauseBlock.element);
    this.panel.element.append(this.next.element);
  }

  private createSoundBlock() {
    if (localStorage.getItem("sound") !== "on") {
      this.sound.element.innerHTML = `<img src="../../assets/images/panel/noSound.svg" alt="#">`;
    } else {
      this.sound.element.innerHTML = `<img src="../../assets/images/panel/sound.svg" alt="#">`;
    }
  }

  private soundEvents(): void {
    let volumeValue: string | null = localStorage.getItem("volume-value");
    this.volume.inputElement.type = "range";
    this.volume.inputElement.min = "0";
    this.volume.inputElement.max = "10";

    if (volumeValue)
      this.volume.inputElement.value = (Number(volumeValue) * 10).toString();

    if (localStorage.getItem("sound") !== "on") {
      this.volume.inputElement.value = "0";
    }

    this.volumeWrapp.element.append(this.volume.inputElement);
    this.player.element.append(this.volumeWrapp.element);

    this.sound.element.addEventListener("mouseover", () => {
      this.volumeWrapp.element.style.visibility = "visible";
    });

    this.sound.element.addEventListener("mouseout", () => {
      setTimeout(() => {
        this.volumeWrapp.element.style.visibility = "hidden";
      }, 1500);
    });

    this.volume.inputElement.addEventListener("mouseover", () => {
      this.volumeWrapp.element.style.visibility = "visibility";
    });
  }

  private changeProgress(): void {
    const progresLine = this.progressBar.element.children[0] as HTMLElement;

    this.progressBar.element.addEventListener("click", (e) => {
      const infoAboutProgress = progresLine.getBoundingClientRect();
      let whidthOfPlayer: number = this.player.element.offsetWidth;
      let clickX: number = e.pageX - infoAboutProgress.left;
      let percentOfSong: number = (clickX / whidthOfPlayer) * 100;

      progresLine.style.width = clickX + "px";

      this.audio.currentTime = (clickX / whidthOfPlayer) * this.audio.duration;
    });
  }

  private uploadProgress(): void {
    const progresLine = this.progressBar.element.children[0] as HTMLElement;
    this.audio.addEventListener("timeupdate", (e) => {
      let whidthOfPlayer: number = this.player.element.offsetWidth;
      progresLine.style.width =
        (whidthOfPlayer / this.audio.duration) * this.audio.currentTime + "px";
    });
  }

  private startTrack(): void {
    const img = this.playOrPauseBlock.element.children[0] as HTMLImageElement;
    localStorage.setItem("currentTrackUrl", "../../assets/yamakasi.mp3");
    localStorage.setItem("isPlay", "false");
    let playImgSrc: string = `../../assets/images/panel/play.svg`;
    let pauseImgSrc: string = `../../assets/images/panel/pause.svg`;

    this.playOrPauseBlock.element.addEventListener("click", () => {
      if (localStorage.getItem("isPlay") === "false") {
        img.src = pauseImgSrc;
        localStorage.setItem("isPlay", "true");
        this.audio.play();
      } else {
        img.src = playImgSrc;
        localStorage.setItem("isPlay", "false");
        this.audio.pause();
      }
    });
  }

  private changeVolume(): void {
    this.volume.inputElement.addEventListener("change", () => {
      this.audio.volume = Number(this.volume.inputElement.value) / 10;
      localStorage.setItem("volume-value", `${this.audio.volume}`);
    });
  }

  private volumeBtnEvents(): void {
    let img = this.sound.element.children[0] as HTMLImageElement;

    if (localStorage.getItem("sound") === "on") {
      img.src = "../../assets/images/panel/sound.svg";
    } else if (localStorage.getItem("sound") === "off") {
      img.src = "../../assets/images/panel/noSound.svg";
    }

    this.sound.element.addEventListener("click", () => {
      let volumeValue: string | null = localStorage.getItem("volume-value");
      let soundPlay: string | null = localStorage.getItem("sound");
      if (soundPlay === "on") {
        img.src = "../../assets/images/panel/noSound.svg";
        localStorage.setItem("sound", "off");
        this.audio.volume = 0;
        this.volumeWrapp.element.innerHTML = `
        <input type="range" min="0" max="10" value="0">
        `;
      } else if (soundPlay === "off") {
        img.src = "../../assets/images/panel/sound.svg";
        localStorage.setItem("sound", "on");
        if (volumeValue) this.audio.volume = Number(volumeValue);
        if (volumeValue) {
          this.volumeWrapp.element.innerHTML = `
        <input type="range" min="0" max="10" value="${
          Number(volumeValue) * 10
        }">
        `;
        } else {
          this.audio.volume = 1;
        }
      }
    });
  }
}

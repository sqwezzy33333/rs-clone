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
  }

  public render(): HTMLElement {
    this.createPlayer();
    this.playerContainer.element.append(this.player.element);
    this.container.append(this.progressBar.element);
    this.container.append(this.playerContainer.element);

    this.soundEvents();

    return this.container;
  }

  private createPlayer() {
    this.createInfoBlock();
    this.createProgress();
    this.createLikeBlock();
    this.createPanelBlock();
    this.createSoundBlock();
    this.player.element.append(this.infoBlock.element);
    this.player.element.append(this.likeBlock.element);
    this.player.element.append(this.panel.element);
    this.player.element.append(this.sound.element);
  }

  private createProgress() {
    const progressBar = document.createElement("div") as HTMLElement;
    progressBar.className = "progress__bar";
    this.progressBar.element.append(progressBar);
  }

  private createInfoBlock() {
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

  private createLikeBlock() {
    let src: string = "../../assets/images/like.svg";
    src = "../../assets/images/noLike.svg";
    this.likeBlock.element.innerHTML = `
    <img src="${src}" alt="#">
    `;
    this.likeBlock.element.addEventListener("click", () => {
      src = "../../assets/images/like.svg";
      this.likeBlock.element.innerHTML = `
        <img src="${src}" alt="#">
    `;
    });
  }

  private createPanelBlock() {
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
    this.sound.element.innerHTML = `<img src="../../assets/images/panel/sound.svg" alt="#">`;
  }

  private soundEvents() {
    const rangeSoundWrapp = document.createElement("div");
    rangeSoundWrapp.className = "player__volume";
    this.volume.inputElement.type = "range";
    this.volume.inputElement.min = "0";
    this.volume.inputElement.max = "10";
    rangeSoundWrapp.append(this.volume.inputElement);
    this.player.element.append(rangeSoundWrapp);

    this.sound.element.addEventListener("mouseover", () => {
      rangeSoundWrapp.style.visibility = "visible";
    });

    this.sound.element.addEventListener("mouseout", () => {
      setTimeout(() => {
        rangeSoundWrapp.style.visibility = "hidden";
      }, 3000);
    });

    this.volume.inputElement.addEventListener("mouseover", function () {
      rangeSoundWrapp.style.visibility = "visibility";
    });

    this.volume.inputElement.addEventListener("mouseout", function () {
      rangeSoundWrapp.style.visibility = "hidden";
    });
  }
}

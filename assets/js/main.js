const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var screenWidth = screen.width;
const audio = $('#audio');
const playBtn = $('.play-btn');
var progress = $('.progress');
var playList = $('.list');
const CD = $('.CD');
var main = $('#main');
var songActive = $$('.song-container');
var nextBTN = $('.next-btn');
var preBTN = $('.pre-btn');
var heading = $('.heading');
var repeatBTN = $('.repeat-btn ');
var randomBTN = $('.random-btn');

const app = {
    isPlaying: false,
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'BTCMX',
            singer: 'Gree',
            path: './assets/songs/9convert.com - GREE  BẢN TÌNH CA MÙA XUÂN Prod by DUCTHANG MUSIC VIDEO.mp3',
            CDplayer: './assets/img/Untitled2.png',
            img: './assets/img/BTCMX_avt.png',
            bg: './assets/img/Untitled-1.png'
        },
    
        {
            name: 'Phố không em',
            singer: 'Gree (Cover)',
            path: './assets/songs/9convert.com - SƯỞI SESSION PHỐ KHÔNG EM  THÁI ĐINH COVER BY GREE.mp3',
            CDplayer: './assets/img/Phokhongem_avt.png',
            img: './assets/img/phokhem.jpg',
            bg: './assets/img/phokoem.png'
        },
    ],


    render: function () {
        const htmls  = this.songs.map ((song,index) => {
            return `
            <div class="song-container">
            <div class="song-item  ${index === this.currentIndex ? 'choosing' : ''}" data-index ="${index}">
                <img src="${song.img}" alt="">
                <div class="info">
                    <div class="info-container">
                        <h6 class="">${song.name}</h6>
                        <p class="artist-name">${song.singer}</p>
                    </div>
                </div>
                <div class="song-nav">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        </div>
            `
        })
        playList.innerHTML = htmls.join("")
    },




   defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
        get: function() {
            return this.songs[this.currentIndex];
        }
    })
   },


   

    nextSong: function () { 
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.render();
    },


    preSong: function () { 
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length-1;
        }
        this.loadCurrentSong();
        this.render();
    },



    repeatSong: function () {
        if (this.isRepeat) {
            this.currentIndex = this.currentIndex
        }
    },


    handleEvent: function() {
        
        var _this = this;
        var CDRotate = CD.animate ([
            {
                transform: 'rotate(360deg)'
            }
        ],{
            duration: 10000,
            iterations: Infinity
        })
        CDRotate.pause();

        audio.onplay = function () {
            playBtn.classList.add('playing');
            _this.isPlaying = true;
            CDRotate.play();
        }


        
        repeatBTN.onclick = function () {
            if (_this.isRepeat) {
                repeatBTN.classList.remove('active');
                _this.isRepeat = false;
            }
            else {
                repeatBTN.classList.add('active');
                _this.isRepeat = true;
            }
        };



        randomBTN.onclick = function () {
            if (_this.isRandom) {
                randomBTN.classList.remove('active');
                _this.isRandom = false;
            }
            else {
                randomBTN.classList.add('active');
                _this.isRandom = true;
            }
            console.log(_this.isRandom);
        }
        
        
        audio.onpause = function () {
            playBtn.classList.remove('playing');
            CDRotate.pause();
            _this.isPlaying = false;
        }


        nextBTN.onclick = function () {
            console.log(_this.isRandom);
            if (_this.isRandom) {
                _this.playRandomSong();
                _this.loadCurrentSong();
                _this.render();
            }
            else {
                _this.nextSong();
            }
            audio.play();
        }

        preBTN.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
                _this.loadCurrentSong();
                _this.render();
            }
            else {
                _this.preSong();
            }
            audio.play();
        }


        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            }
            else {
                nextBTN.click();
            }
        }



        playBtn.onclick = function () {
            if (_this.isPlaying == true) {
                audio.pause();
            }
            else if (_this.isPlaying == false) {
                audio.play();
            }
        }

        audio.ontimeupdate = function () {
            if (audio.duration) {
                const songPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = songPercent;
            }
        }
        
        
        progress.onchange = function (e) {
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime;
            console.log(seekTime);
            console.log(e.target.value);
        }

        
        playList.onclick = function (e) {
            songChoosing = e.target.closest('.song-item:not(.choosing)');
            if (songChoosing || (e.target.closest('.song-nav'))) {
                if (songChoosing) {
                    _this.currentIndex = Number(songChoosing.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        }
    },


    playRandomSong: function () {
        var newIndex = 0;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex == this.currentIndex);
        this.currentIndex = newIndex;
        console.log(this.currentIndex);
    },

    
   loadCurrentSong: function () {    
        console.log(this.currentIndex);
        CD.style.backgroundImage = `url('${this.currentSong.CDplayer}')`;
        heading.innerHTML = `${this.currentSong.name}`;
        if (screenWidth > 820) {
            main.style.backgroundImage = `url('${this.currentSong.bg}')`;
        }
        audio.src = this.currentSong.path;
    },

    start: function () {
        this.defineProperties();
        this.handleEvent();
        this.loadCurrentSong();
        this.render();
    }
}
app.start();

console.log(screenWidth);



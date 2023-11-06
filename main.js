const container = document.querySelector(".music-player")
const info = document.querySelector(".info")
const ellipsis = document.querySelector(".ellipsis")
const arrow = document.querySelector(".arrow");
const shuffle = document.querySelector("#shuffle");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const next = document.querySelector("#next");
const repeat = document.querySelector("#repeat");
const audio = document.querySelector("#audio")
const songImage = document.querySelector(".song-img>img")
const songName = document.querySelector(".song-name")
const songArtist = document.querySelector(".song-artist")
const maxDuration = document.querySelector(".max-duration")
const currentTime = document.querySelector(".current-time")
const progress = document.querySelector(".progress")
const progressBar = document.querySelector(".progress-bar")
const close = document.querySelector(".close")
const playlist = document.querySelector(".playlist")
const playlistSongs = document.querySelector(".playlist-songs")
const overlay = document.querySelector(".overlay")

// sıra
let index

// json
const songList = [
    {
        id: 1,
        name: "Kim Bilir",
        artist: "Ceza",
        link: "img/ceza.mp3",
        img: "img/ceza.jpg",
    },
    {
        id: 2,
        name: "Keskin",
        artist: "Cem Adrian",
        link: "img/cemadrian.mp3",
        img: "img/cemadrian.jpg",
    },
    {
        id: 3,
        name: "Gitme",
        artist: "Reynmen",
        link: "img/reynmen.mp3",
        img: "img/reynmen.jpg",
    },
    {
        id: 4,
        name: "Aşk Şarkısı",
        artist: "Şanıser",
        link: "img/saniser.mp3",
        img: "img/saniser.jpg",
    },
    {
        id: 5,
        name: "Galiba",
        artist: "Sagopa Kajmer",
        link: "img/sagopakajmer.mp3",
        img: "img/sagopakajmer.jpg",
    },
    {
        id: 5,
        name: "Yağmurlar",
        artist: "Anıl Piyancı",
        link: "img/anilpiyanci.mp3",
        img: "img/anilpiyanci.jpg",
    }
]

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}

const setSong = (index) => {
    let { name, artist, link, img } = songList[index]
    songName.innerText = name
    songArtist.innerText = artist
    songImage.src = img
    audio.src = link
    overlay.innerText = artist[0].toLowerCase().replace('ş', 's')

    audio.onloadeddata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }
    progressBar.style.width = "0%"
    if (index) {
        playAudio()
    }
}

const playAudio = () => {
    audio.play()
    pause.classList.remove("d-none")
    play.classList.add("d-none")
}

const pauseAudio = () => {
    audio.pause()
    pause.classList.add("d-none")
    play.classList.remove("d-none")
}

const nextAudio = () => {
    if (index == songList.length - 1) {
        index = 0;
    } else {
        index += 1
    }
    songImage.classList.add("slide-right");
    overlay.classList.add("slide-right")
    setTimeout(() => {
        songImage.classList.remove("slide-right");
        overlay.classList.remove("slide-right")
    }, 500);
    setSong(index)
    playAudio()
}

const prevAudio = () => {
    if (index > 0) {
        index -= 1
    } else {
        index = songList.length - 1
    }
    songImage.classList.add("slide-left");
    overlay.classList.add("slide-right")
    setTimeout(() => {
        songImage.classList.remove("slide-left");
        overlay.classList.remove("slide-right")
    }, 500);
    setSong(index)
    playAudio()
}

play.addEventListener("click", playAudio)

pause.addEventListener("click", pauseAudio)

next.addEventListener("click", nextAudio)

prev.addEventListener("click", prevAudio)

shuffle.addEventListener("click", () => {
    let randomIndex = Math.floor(Math.random() * songList.length)
    if (repeat.classList.contains("active")) {
        repeat.classList.remove("active")
    }
    if (shuffle.classList.contains("active")) {
        shuffle.classList.remove("active")
    } else {
        setSong(randomIndex)
        shuffle.classList.add("active")
    }
})

repeat.addEventListener("click", () => {
    if (shuffle.classList.contains("active")) {
        shuffle.classList.remove("active")
    }
    if (repeat.classList.contains("active")) {
        repeat.classList.remove("active")
    } else {
        repeat.classList.add("active")
        audio.loop = true
    }
})

progress.addEventListener("click", (e) => {
    let coordStart = e.target.offsetLeft
    let coordEnd = e.clientX
    let progressNew = (coordEnd - coordStart) / progress.offsetWidth

    progressBar.style.width = progressNew * 100 + "%"
    audio.currentTime = progressNew * audio.duration

    audio.play()
    pause.classList.remove("d-none")
    play.classList.add("d-none")
})

audio.addEventListener("timeupdate", () => {
    currentTime.innerText = timeFormatter(audio.currentTime)
    progressBar.style.width = (audio.currentTime / audio.duration.toFixed(2) * 100 + "%")
})

const initializePlaylist = () => {
    for (const i in songList) {
        playlistSongs.innerHTML +=
            `<li class="playlist-li" onclick="setSong(${i})"> 
                <div class="playlist-wrapper">
                    <img class="playlist-img" src="${songList[i].img}" title=""/>
                    <div class="playlist-content">
                        <p>${songList[i].name}</p>
                        <p>${songList[i].artist}</p>
                    </div>
                </div>
            </li>
            `
    }

}

arrow.addEventListener("click", () => {
    container.classList.toggle("slide-down")
    arrow.style.transform = "rotate(0deg)"
    info.style.display = "none"
    if (container.classList.contains("slide-down")) {
        arrow.style.transform = "rotate(180deg)"
        info.style.display = "block"
    }
})

ellipsis.addEventListener("click", () => {
    container.classList.toggle("slide-down")
    playlist.style.display = "none"
    if (container.classList.contains("slide-down")) {
        playlist.style.display = "block"
    }
})

playlistSongs.addEventListener("click", () => {
    container.classList.toggle("slide-down")
    playlist.style.display = "none"
    if (container.classList.contains("slide-down")) {
        playlist.style.display = "block"
        info.style.display = "block"
    }
})

audio.onended = () => {
    if (!repeat.classList.contains("active")) {
        nextAudio()
    }
}

window.onload = () => {
    index = 0;
    setSong(index)
    initializePlaylist()
}

console.log("Welcome to Spotify!");

let element = Array.from(document.getElementsByClassName('songItemPlay'));

let MasterSongName =  document.getElementById("MasterSongName");
let songIndex = 0;

let audioElement = new Audio("songs/1.mp3");

let masterPlay = document.getElementById("masterplay");
let myprogressbar = document.getElementById("progressBar");

let gif = document.getElementById("gif");

let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "What I Have Done" , filePath :'songs/1.mp3' ,coverPath :"coverNames/song_cover1.jpg"},
    {songName: "In The End" , filePath :'songs/2.mp3' ,coverPath :"coverNames/song_cover2.jpg"},
    {songName: "Numb" , filePath :'songs/3.mp3' ,coverPath :"coverNames/song_cover3.jpg"},
    {songName: "Lost In The Echo" , filePath :'songs/4.mp3' ,coverPath :"coverNames/song_cover4.jpg"},
    {songName: "New Divide" , filePath :'songs/5.mp3' ,coverPath :"coverNames/song_cover5.jpg"},
];

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

//Listen to the Events


masterPlay.addEventListener('click',()=>
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
        element[songIndex].classList.remove('fa-play');
        element[songIndex].classList.add('fa-pause');
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
        makeAllPlays();
    }
})
audioElement.addEventListener('timeupdate',()=>
{
    progress = parseFloat((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
    console.log(myprogressbar.value);
    if(myprogressbar.value == 100.0)
       {
        myprogressbar.value =0;
        if(songIndex == 4)
        {
            songIndex=0;
            audioElement.src=`songs/${songIndex+1}.mp3`;
            audioElement.play();
            MasterSongName.innerText =songs[songIndex].songName;
            makeAllPlays();
            element[songIndex].classList.remove('fa-play');
            element[songIndex].classList.add('fa-pause');
        }
        else
        {
          makeAllPlays();
          songIndex +=1;
            element[songIndex].classList.remove('fa-play');
            element[songIndex].classList.add('fa-pause');
          audioElement.src=`songs/${songIndex+1}.mp3`;
          audioElement.play();
          MasterSongName.innerText =songs[songIndex].songName;
        }
       }
})

myprogressbar.addEventListener('change',()=>
{
  audioElement.currentTime =(myprogressbar.value*audioElement.duration)/100;
})

const makeAllPlays=()=>
{
 Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.add('fa-play');
    element.classList.remove('fa-pause');
 })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> 
{
    element.addEventListener('click',(e)=>
    {
        if(e.target.classList.contains('fa-play'))
        {
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        MasterSongName.innerText =songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        }
        else
        {
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity=0;
        }

    })
})

document.getElementById("next").addEventListener('click',()=>{
    if(songIndex == 4)
      {
        songIndex = 0;
      }
      else
      {
        songIndex += 1;
      }
      audioElement.src=`songs/${songIndex+1}.mp3`;
      audioElement.currentTime=0;
      audioElement.play();
      MasterSongName.innerText =songs[songIndex].songName;
      masterPlay.classList.remove('fa-play');
      masterPlay.classList.add('fa-pause');

      let element = Array.from(document.getElementsByClassName('songItemPlay'));


        makeAllPlays();
        element[songIndex].classList.remove('fa-play');
        element[songIndex].classList.add('fa-pause');
        
})

document.getElementById("previous").addEventListener('click',()=>{
    if(songIndex == 0)
      {
        songIndex = 4;
      }
      else
      {
        songIndex -= 1;
      }
      audioElement.src=`songs/${songIndex+1}.mp3`;
      MasterSongName.innerText =songs[songIndex].songName;
      audioElement.currentTime=0;
      audioElement.play();
      masterPlay.classList.remove('fa-play');
      masterPlay.classList.add('fa-pause');

      let element = Array.from(document.getElementsByClassName('songItemPlay'));
        makeAllPlays();
        element[songIndex].classList.remove('fa-play');
        element[songIndex].classList.add('fa-pause');
})
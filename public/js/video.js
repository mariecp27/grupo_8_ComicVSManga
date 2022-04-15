let videoSource = [
    '/images/categories/introMarvel.mp4',
    '/images/categories/introDC.mp4',
    '/images/categories/introIndependent.mp4',
];

let i = 0;

let videoCount = videoSource.length;

let videos = document.getElementById("bannerVideos");

let videoPlay = (videoNum) => {
    videos.setAttribute("src", videoSource[videoNum]);
    videos.autoplay = true;
    videos.load();
    videos.play();
}

let myHandler = () => {
    i++;
    if(i == (videoCount)){
        i = 0;
        videoPlay(i);
    }else{
        videoPlay(i);
    }
}

document.getElementById('bannerVideos').addEventListener('ended', myHandler, false);



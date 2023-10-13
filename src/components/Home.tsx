import { useState, useRef } from 'react';
import '../App.css'
import videoBg from '../assets/videos/dieforu.mp4';
import ykVideo from '../assets/videos/ykon.mp4'; 
import glimpseVideo from '../assets/videos/Glimpseofus.mp4';
import tikVideo from '../assets/videos/ticktock.mp4';
import upgradeVideo from '../assets/videos/upgrade.mp4';

const Home = () => {
    const [videoSrc, setVideoSrc] = useState(videoBg);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);


    
    const handleVolumeChange = (event) => {
        const volume = event.target.value;
        videoRef.current.volume = volume;

    }

    const handleProgress = () => {
        const video = videoRef.current;
        const progressBar = document.getElementById("progressbar");
        progressBar.value = (video.currentTime / video.duration) * 100;
    }

    const handleSeek = (event) => {
        const video = videoRef.current;
        video.currentTime = (event.target.value / 100) * video.duration;
    }

    const toggleFullscreen = () => {
        const video  = videoRef.current;
        if (video.requestFullscreen){
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen){
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }

    
    const handleInvert = () => {
        const video = document.getElementById("mainvideo");
        if (!video) return;  // If the video element is not found, do nothing
    
        const currentFilter = video.style.webkitFilter || "";
    
        if (currentFilter.includes("invert(100%)") || !currentFilter) {
            video.style.webkitFilter = "invert(0%)";
        } else {
            video.style.webkitFilter = "invert(100%)";
        }
    }


    const togglePlayPause = () => {
        setShowControls(false)
        const video = document.getElementById("mainvideo");
        if (video?.paused || video?.ended) {
            video.play();
            setIsPlaying(true);
        } else {
            video?.pause();
            setIsPlaying(false);
        }
    }
    
        
    const handleVideoChange = (source: string) => {
        setVideoSrc(source);
        setIsMuted(false);
        setShowControls(false);
    }

    return (
        <div id="Home" className=" w-screen h-screen">
            <video 
                id="mainvideo" 
                className="z-20 w-screen h-screen object-cover" 
                src={videoSrc} 
                autoPlay 
                muted={isMuted} 
                loop 
                controls={showControls}
                ref={videoRef}
                onTimeUpdate={handleProgress}
                
            />
            <header className="absolute top-[100vh]">
                <h1 className="text-5xl"><strong>Joji</strong> SMITHEREENS OUT NOW </h1>
                <div className="flex space-x-10 text-5xl">
                    <a href="https://jojimusic.com/" target="_blank" rel="noreferrer"><h1> Tour </h1></a>
                    <a href="https://shop.jojimusic.com/" target="_blank" rel="noreferrer"><h1> Shop </h1></a>
                    <button type="button" onClick={handleInvert}> Invert </button>
                </div>
            </header>
            <div id="yukontext" className='absolute top-[180vh] right-10'>
                <button onClick={ () => handleVideoChange(ykVideo)}>
                    <h1>Yukon's Interlude </h1>
                    <p> 3:28 </p>
                </button>
            </div>
            <div className='absolute top-[180vh] left-10'>
                <button onClick= { () => handleVideoChange(glimpseVideo)}>
                    <h1> Glimpse of Us</h1>
                    <p> 3:54 </p>
                </button>
            </div>
            <div className='absolute top-[180vh] left-[500px]'>
                <button onClick= { () => handleVideoChange(tikVideo)}>
                    <h1> Tick Tock </h1>
                    <p> 2:12 </p>
                </button>
            </div>
            <div className='absolute top-[180vh] left-[300px]'>
                <button onClick= { () => handleVideoChange(upgradeVideo)}>
                    <h1> Upgrade </h1>
                    <p> 1:35 </p>
                </button>
            </div>
            {/*Player */}
            <div className='flex'>
            <button id="play" className="absolute top-[195vh] left-[100px] text-white" onClick={togglePlayPause}> Play/Pause </button>
            <input id="progressbar" className='absolute top-[195vh] left-[200px]' type="range" min="0" max="100" step="0.1" onChange={handleSeek} />
            <input id='volcontrol' className='absolute top-[183vh] ' type="range" min="0" max="1" step="0.01" onChange={handleVolumeChange} />
            <button id="fullscreenBtn" className='absolute top-[195vh] right-10' onClick={toggleFullscreen}> Fullscreen </button>
            </div>
        </div>
    )
}

export default Home;

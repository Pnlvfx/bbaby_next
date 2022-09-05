import { ReactNode, useContext, useEffect } from 'react'
import { formatDuration, getDuration } from './utils/hooks';
import { VideoPlayerContext, VideoPlayerContextProps } from './VidePlayerContext';

interface EffectsProps  {
    children: ReactNode
  }

const Effects = ({ children }: EffectsProps) => {
  const {controls, setControls, videoContainerRef, player, isEnded, isMuted, setIsMuted, volumeSliderContainer, setIsEnded, volumeSlider, timelineBall, setprogressPosition, setPlayed, setDuration, timelineRef, setIsPlaying, previewPositionRef} = useContext(VideoPlayerContext) as VideoPlayerContextProps;

  let isScrabbing = false
  let wasPaused = false

  let isChangeVolume = false
  let isStillClicked = false

  const onPlay = () => {
    setIsPlaying(true);
    if (isEnded) setIsEnded(false);
  }
  const onEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  }

  const onTimeUpdate = () => {
    if (!player.current) return;
    setPlayed(formatDuration(player.current.currentTime));
    const percent = player.current.currentTime / player.current.duration
    setprogressPosition(percent);
  }

  const toggleScrubbing = (e: MouseEvent) => {
    const rect = timelineRef.current?.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    isScrabbing = (e.buttons & 1) === 1
    timelineBall.current.style.opacity = '1'
    if (isScrabbing) {
      wasPaused = player.current.paused
      player.current.pause()
    } else {
      player.current.currentTime = percent * player.current.duration
      if (!wasPaused) player.current.play()
      setTimeout(() => {
        timelineBall.current.style.opacity = '0'
      }, 300)
    }
    handleTimelineUpdate(e);
  }

  const handleTimelineUpdate = (e: MouseEvent) => {
    const rect = timelineRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    previewPositionRef.current.style.width = `${percent*100}%`;

    if (isScrabbing) {
      e.preventDefault();
      setprogressPosition(percent);
    }
  }

  const documentMouseUP = (e: MouseEvent) => {
      if (isScrabbing) toggleScrubbing(e);
      if (isStillClicked) {
        e.preventDefault();
        e.stopPropagation();
        isChangeVolume = false
      }
  }

  const documentMouseMOVE = (e: MouseEvent) => {
    if (isScrabbing) handleTimelineUpdate(e);
  }

  const onVolumeChange = () => {
    volumeSlider.current.style.height = `${player.current.volume*100}%`
    if (player.current.muted || player.current.volume === 0) {
      volumeSlider.current.style.height = '0'
      setIsMuted(true);
    } else
    if (isMuted) {
      setIsMuted(false);
    }
  }

  const clickVolumeSlider = (e: MouseEvent) => {
    e.preventDefault();
      isChangeVolume = true;
      isStillClicked = true;
      const rect = volumeSliderContainer.current.getBoundingClientRect()
      const percent = Math.min(Math.max(0, e.y - rect.y), rect.height) / rect.height
      const reverse = 1 - Math.abs(percent);
      player.current.volume = reverse
      player.current.muted = reverse === 0
      setIsMuted(reverse === 0)
      volumeSlider.current.style.height = `${reverse*100}%`
  }

  const slideOnVolume = (e: MouseEvent) => {
    if (isChangeVolume) {
      const rect = volumeSliderContainer.current.getBoundingClientRect()
      const percent = Math.min(Math.max(0, e.y - rect.y), rect.height) / rect.height
      const reverse = 1 - Math.abs(percent)
      player.current.volume = reverse
      player.current.muted = reverse === 0
      volumeSlider.current.style.height = `${reverse*100}%`
    }
  }

  const addListeners = () => {
    //player.current?.addEventListener('waiting', (ev) => {console.log(ev)});
    player.current?.addEventListener('play', () => onPlay());
    player.current?.addEventListener('pause', () => {setIsPlaying(false)});
    player.current?.addEventListener('ended', () => onEnded());
    //CURRENT TIME AND PROGRESS VALUE
    player.current?.addEventListener('timeupdate', () => onTimeUpdate())
    //PROGRESS BAR
    timelineRef.current?.addEventListener('mousemove', handleTimelineUpdate); //preview
    timelineRef.current?.addEventListener('mousedown', toggleScrubbing); //progress
    document.addEventListener('mouseup', (e) => documentMouseUP(e))
    document.addEventListener('mousemove', documentMouseMOVE)
    //VOLUME
    player.current?.addEventListener('volumechange', onVolumeChange);
    volumeSliderContainer.current?.addEventListener('mousedown', (e) => clickVolumeSlider(e));
    volumeSliderContainer.current?.addEventListener('mousemove', (e) => slideOnVolume(e));
    //CONTAINER
    videoContainerRef.current?.addEventListener('mouseenter', (ev) => {
      setControls(true);
    })
    videoContainerRef.current?.addEventListener('mouseleave', (ev) => {
      setControls(false);
    })
  }

  const removeListeners = () => {
    player.current?.removeEventListener('play', () => onPlay());
    player.current?.removeEventListener('pause', () => {setIsPlaying(false)});
    player.current?.removeEventListener('ended', () => onEnded());
    //CURRENT TIME AND PROGRESS VALUE
    player.current?.removeEventListener('timeupdate', () => onTimeUpdate())
    //PROGRESS BAR
    timelineRef.current?.removeEventListener('mousemove', handleTimelineUpdate); //preview
    timelineRef.current?.removeEventListener('mousedown', toggleScrubbing); //progress
    document.removeEventListener('mouseup', (e) => documentMouseUP(e))
    document.removeEventListener('mousemove', documentMouseMOVE)
    //VOLUME
    player.current.removeEventListener('volumechange', onVolumeChange);
    volumeSliderContainer.current?.removeEventListener('mousedown', (e) => clickVolumeSlider(e));
    volumeSliderContainer.current?.removeEventListener('mousemove', (e) => slideOnVolume(e));
    //CONTAINER
    videoContainerRef.current?.removeEventListener('mouseenter', (ev) => {
      setControls(true);
    })
    videoContainerRef.current?.removeEventListener('mouseleave', (ev) => {
      setControls(false);
    })
  }

  useEffect(() => {  // Add the listeners!
    addListeners();

    /////
    const duration = getDuration(player.current);
    if (!duration) return;
    setDuration(formatDuration(duration))

    return () => {
      console.log('listeners removed')
      removeListeners()
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default Effects;

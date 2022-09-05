import { useContext, useState } from "react";
import { VideoPlayerContext, VideoPlayerContextProps } from "../VidePlayerContext";

const Slider = () => {
  const {controls, timelineBall, progressPosition, timelineRef, previewPositionRef} = useContext(VideoPlayerContext) as VideoPlayerContextProps;

  return (
    <div
     className={`${controls ? 'opacity-0 md:opacity-100' : 'opacity-0'} transition-opacity relative m-auto flex h-auto w-full flex-grow items-center z-[4] outline-none align-baseline`}
    >
      <div ref={timelineRef} onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }} className="relative mr-2 ml-2 h-4 flex-grow cursor-pointer">
        <div
          aria-label="Seek Slider"
          aria-valuemin={0}
          aria-valuemax={36}
          role="slider"
          aria-valuenow={0}
          tabIndex={0}
        >
            <div style={{borderRadius: 2}} className="w-full bg-white opacity-20 absolute top-[6px] h-1" />
            <div className="absolute top-[6px] h-1 bg-white opacity-50" style={{width:'50%', borderRadius: 2}} />
            <div ref={previewPositionRef} className="absolute top-[6px] h-1 bg-white opacity-70" style={{width: 0, borderRadius: 2}} />
            <div className="top-[6px] h-1 bg-[#0079d3] absolute" style={{width: `${progressPosition*100}%`, borderRadius: 2}} />
        </div>
        <div ref={timelineBall} style={{
          borderRadius: '50%',
          marginLeft: `calc(${progressPosition*100}% - 8px)`,
          opacity: 0
          }} className="absolute bottom-0 h-4 top-0 w-4 bg-[#0079d3] transition-opacity" />
      </div>
    </div>
  )
}

export default Slider;

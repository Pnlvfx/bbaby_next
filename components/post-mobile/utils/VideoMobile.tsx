import { CSSProperties, useEffect, useRef } from "react"
import { VideoPlayFromBarIcon } from "../../utils/SVG"

export interface PostMobile {
  post: PostProps
}

const VideoMobile = ({post}: PostMobile) => {

  return (
    <div className="videoMobile" style={{'--max-height': '100%', '--aspect-ratio': `${post.mediaInfo?.dimension[1]} / ${post.mediaInfo?.dimension[0]}`} as CSSProperties}>
      <div className="videoMobile" style={{'--max-height': '100%', '--aspect-ratio': `${post.mediaInfo?.dimension[1]} / ${post.mediaInfo?.dimension[0]}`} as CSSProperties}>
        <div className="videoMobile" style={{'--max-height': '100%', '--aspect-ratio': `${post.mediaInfo?.dimension[1]} / ${post.mediaInfo?.dimension[0]}`} as CSSProperties}>
          <link
            className="hidden"
            rel="preload"
            href={post?.mediaInfo?.video.url.replace('.mp4', '.jpg')}
            as="image"
          />
          <div className="block h-full max-h-[100%] w-full videoMobile" style={{'--max-height': '100%', '--aspect-ratio': `${post.mediaInfo?.dimension[1]} / ${post.mediaInfo?.dimension[0]}`} as CSSProperties}>
            <div style={{'--max-height': '100%', '--aspect-ratio': `${post.mediaInfo?.dimension[1]} / ${post.mediaInfo?.dimension[0]}`} as CSSProperties}>
              <div className="inline-block h-full w-full">
                <div className="inline-block h-full w-full">
                  <video
                    preload="none"
                    playsInline
                    src={post?.mediaInfo?.video.url}
                    poster={post?.mediaInfo?.video.url.replace('.mp4', '.jpg')}
                    className="video absolute videoSlot"
                  >
                    <source src={post?.mediaInfo?.video.url} />
                  </video>
                </div>
                {/* <div className="absolute inset-0 block">
                  <img
                    src={post.mediaInfo.video.url.replace('.mp4', '.jpg')}
                    loading="lazy"
                    alt="media poster"
                    className="absolute inset-0 inline-block h-full w-full object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-25">
                  <div className="relative h-full min-h-[48px] w-full min-w-[48px] cursor-pointer rounded-sm text-white">
                    <i className="absolute inset-0 flex items-center justify-center text-[32px] leading-9 opacity-100">
                      <VideoPlayFromBarIcon className="h-[1em] w-auto overflow-hidden" />
                    </i>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoMobile

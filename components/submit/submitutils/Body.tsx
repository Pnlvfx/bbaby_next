import { useContext, useRef, useState } from "react";
import { SubmitContext, SubmitContextType } from "../SubmitContext";
import ClickOutHandler from 'react-clickout-ts';
import { TrashIcon } from "../../utils/SVG";
import Video from "../../utils/video/Video";
import SubmitButton from "../each-submit-button/SubmitButton";

const Body = () => {
  const [showDeleteOptions,setShowDeleteOptions] = useState(false);
  const [activeClassBody, setActiveClassBody] = useState(false);
  const { thumbnail, height, width, selectedFile, setSelectedFile, isImage, setIsImage, body, setBody, isVideo } = useContext(SubmitContext) as SubmitContextType;
  const [activeFigure, setActiveFigure] = useState(false);
  const videoRef = useRef(null);

  const figureClickOut = () => {
    setShowDeleteOptions(false);
    setActiveFigure(false);
  }

  const deleteCurrentImage = () => {
    setSelectedFile(null)
    setIsImage(false)
    setShowDeleteOptions(false)
  }

  const clickOnFigure = () => {
    setActiveFigure(true)
    setShowDeleteOptions(true)
  }

  return (
    <div className='relative'>
      <div
        className={`rounded-[4px] relative border solid ${activeClassBody ? 'border-reddit_text' : 'border-reddit_border'}`}
        onClick={() => setActiveClassBody(true)}
      >
        <ClickOutHandler onClickOut={() => {
          setActiveClassBody(false)
        }} >
                  <div className='sticky top-12 z-[8] items-center bg-[#272729] rounded-[4px] box-border flex' style={{flexWrap: 'nowrap'}}>
            <SubmitButton />    
        </div>
        <div className="overflow-auto relative">
          <div className="relative z-[1]">
            <div className="outline-none whitespace-pre-wrap break-words rounded-[4px] overflow-hidden min-h-[122px] py-2 px-4 resize-y leading-[21px] text-[14px]">
              <div>

              </div>
            {selectedFile && (
              <>
                <figure>
                  <ClickOutHandler onClickOut={() => {figureClickOut()}}>
                    <div className="mt-2 mb-1">
                      {showDeleteOptions && (
                          <div className='justify-center bottom-0 flex h-0 sticky top-10 z-10' onClick={() => {deleteCurrentImage()}}>
                            <div 
                              className="bg-[#272729] rounded-[4px] box-border h-[30px] translate-y-[-40px] flex felx-row items-center hover:bg-reddit_hover" 
                              style={{boxShadow: '0 0 0 1px #343536, 0 1px 10px #343536'}}>
                              <button className="rounded-[4px] border-none p-[3px] items-center flex box-border outline-none relative transition-colors">
                                <TrashIcon className='text-reddit_text-darker p-0 inline-block h-5 w-5 text-[20px] leading-5 box-border overflow-hidden' />
                                <div></div>
                              </button>
                            </div>
                          </div>
                      )}
                      <div className="h-1 mt-[-1px] overflow-hidden pointer-events-none w-0">
                        <br />
                      </div>
                        <div contentEditable={false} onClick={() => {clickOnFigure()}}>
                          <div draggable={true} className='py-1'>
                            <div id="_1FME"
                              className={`transition-colors justify-center shadow-none p-0 bg-transparent rounded-[8px] flex relative`} 
                              style={{overflow: 'visible'}}>
                                <div 
                                  style={{userSelect: 'all'}} 
                                  className=
                                  {`${activeFigure && "shadow-[0_0_0_4px_#d7dadc]"} transition-shadow flex-grow justify-center overflow-hidden relative rounded-[8px] ${isVideo && 'block pt-[56.25%]'}`
                                  }>
                                    {isVideo && (
                                      <>
                                        <div className="opacity-100 bottom-0 left-0 absolute right-0 top-0 z-[1]">
                                          <div
                                          className="h-full cursor-default whitespace-nowrap overflow-hidden max-w-[100%] max-h-[100%] relative" style={{userSelect: 'none'}}>
                                              <Video url={selectedFile} poster={thumbnail} />
                                              <div className="absolute top-0 bottom-0 left-0 right-0" />
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  {isImage && (
                                    <>
                                      <img
                                        draggable={false}
                                        src={selectedFile}
                                        alt={''}
                                        className='rounded-[8px] self-center max-w-[100%] z-0'
                                      />
                                      <div className="opacity-0 bottom-0 left-0 absolute right-0 z-10 h-[64px]">
                                        
                                      </div>
                                    </>
                                    )}
                                </div>
                            </div>
                          </div>
                      </div>
                      <div className="h-1 mt-[-1px] overflow-hidden pointer-events-none w-0">
                        <br />
                      </div>
                    </div>
                  </ClickOutHandler>
                </figure>
                <div className="mx-[10%] mb-3">
                  <div className="text-[13px] leading-[18px] text-center relative whitespace-pre-wrap">
                    <span className="text-reddit_text-darker">Add a caption</span>
                  </div>
                </div>
              </>
            )}
            {!selectedFile && ( //body start here
              <div className="text-left relative whitespace-pre-wrap ">
                <textarea 
                  className='placeholder-reddit_text-darker w-full outline-none bg-reddit_dark-brighter min-h-[135px] text-[16px]'
                  placeholder={'Text (optional)'}
                  onChange={e => setBody(e.target.value)}
                  value={body}
                />
              </div>
            )}
            </div>
          </div>
          </div>
        </ClickOutHandler>
        </div>
    </div>
  )
}

export default Body;

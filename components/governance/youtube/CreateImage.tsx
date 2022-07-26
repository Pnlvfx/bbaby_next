import axios from "axios"
import {useState } from "react"
import { buttonClass, Spinner } from "../../utils/Button"
import { inputClass } from "../../utils/Input"
import YoutubeLogin from "./YoutubeLogin"

type CreateImageProps = {
  modalType: string,
  setModalType: any,
  setInput: any,
  input: any
}

const CreateImage = ({modalType,setModalType,setInput,input}:CreateImageProps) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const _value = {
      textColor: 'rgb(26, 26, 27)',
      community: 'Italy',
      fontSize: '48',
      format: 'webp'
    }
    const [value,setValue] = useState(_value)
    const [loading,setLoading] = useState(false)
    const createImage = async() => {
        try {
          setLoading(true)
          const data = {textColor: value.textColor, community:value.community,fontSize:value.fontSize,format:value.format}
          const res = await axios.post(`${server}/governance/create-image`,data, {withCredentials:true})
          setInput(res.data)
          setModalType('create_video')
          setLoading(false) 
        } catch (err:any) {
          err.response.data.msg &&
          setInput({...input,err:err.response.data.msg})
          setLoading(false)
        }
      }
  return (
   <>
   {modalType === 'create_image' && (
          <>
            <form className="p-2 w-[350px] text-sm">
              <div id="set_community" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Community:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <input type='text' title='community' value={value.community} onChange={(e) => setValue({...value,community:e.target.value})} className={`${inputClass} p-2 font-bold`}/>
                    </div>
                </div>
                <div id="set_text_color" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Text Color:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <input type='text' title='text_color' value={value.textColor} onChange={(e) => setValue({...value,textColor:e.target.value})} className={`${inputClass} p-2 font-bold`}/>
                    </div>
                </div>
                <div id="set_font_size" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Font Size:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <input type='text' title='font_size' value={value.fontSize} onChange={(e) => setValue({...value,fontSize:e.target.value})} className={`${inputClass} p-2 font-bold`}/>
                    </div>
                </div>
                <div id="format" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Format:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <input type='text' title='font_size' value={value.format} onChange={(e) => setValue({...value,format:e.target.value})} className={`${inputClass} p-2 font-bold`}/>
                    </div>
                </div>
            </form>
            <div id="create_image" className="mt-2 flex p-2">
                    <div className="self-center">
                      <h1 className="">Submit:</h1>
                    </div>
                    {/* <YoutubeLogin /> */}
                    <div className="self-center w-40 ml-3 mr-5">
                        <button type='submit' disabled={loading ? true : false} className={`w-40 h-7 self-center ${buttonClass()}`} onClick={() => {
                          createImage()
                        }}>
                          {loading && <Spinner />}
                          {!loading && <p>Create Image</p>}
                        </button>
                    </div>
                </div>
              </>
        )}
   </>
  )
}

export default CreateImage
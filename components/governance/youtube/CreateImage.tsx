import axios from "axios"
import { SetStateAction, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Button from "../../utils/Button"
import Input from "../../utils/Input"

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
                      <Input type='text' title='community' value={value.community} onChange={(e: { target: { value: any } }) => setValue({...value,community:e.target.value})} className='p-2 font-bold'/>
                    </div>
                </div>
                <div id="set_text_color" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Text Color:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='text_color' value={value.textColor} onChange={(e: { target: { value: any } }) => setValue({...value,textColor:e.target.value})} className='p-2 font-bold'/>
                    </div>
                </div>
                <div id="set_font_size" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Font Size:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='font_size' value={value.fontSize} onChange={(e: { target: { value: any } }) => setValue({...value,fontSize:e.target.value})} className='p-2 font-bold'/>
                    </div>
                </div>
                <div id="format" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Format:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='font_size' value={value.format} onChange={(e: { target: { value: any } }) => setValue({...value,format:e.target.value})} className='p-2 font-bold'/>
                    </div>
                </div>
            </form>
            <div id="create_image" className="mt-2 flex p-2">
                    <div className="self-center">
                      <h1 className="">Submit:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      {loading && (
                        <Button disabled className='w-40 h-7 mb-3 ml-auto mr-5'>
                            <AiOutlineLoading3Quarters className='animate-spin mx-auto' />
                        </Button>
                      )}
                      {!loading && (
                        <Button type='submit' onClick={() => {
                          createImage()
                        }} className='w-40 h-7 mb-3 ml-auto mr-5'>
                            <h1>Create Image</h1>
                        </Button>
                      )}
                    </div>
                </div>
              </>
        )}
   </>
  )
}

export default CreateImage
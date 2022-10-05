import { useEffect } from "react";
import { useSession } from "../auth/UserContext";

const YandexAds = () => {
    const {session} = useSession();
    const yandexBlock = session?.device?.mobile ? 1 : 2

    useEffect(() => {
        if (typeof window === undefined) return;
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') return;
        (window as any).yaContextCb.push(()=>{
          (window as any).Ya.Context.AdvManager.render({
            renderTo: `yandex_rtb_R-A-1957512-${yandexBlock}`,
            blockId: `R-A-1957512-${yandexBlock}`,
            onError: (data: {
              type: 'error'
              code: string
              text: string
            }) => {
              
            }
          })
        })
      }, []);

  return (
    <div className="mb-2" id={`yandex_rtb_R-A-1957512-${yandexBlock}`}></div>
  )
}

export default YandexAds;

import Head from "next/head";
import { useEffect } from "react";

interface CEOProps {
    /**
    * Must be between 40 and 60 characters.
    */
    title: string;
    /**
    * Must be the canonical url.
    */
    url: string
    /**
    * Use article for articles and website for the rest of your pages.
    */
    image?: string
    /**
    * use the main image if present
    */
    description: string;
    /**
    * Use article for articles and website for the rest of your pages.
    */
    type: 'article' | 'website'
    /**
    * The locale of the current page
    */
    index: boolean
    /**
    * Use article for articles and website for the rest of your pages.
    */
    twitter_card: 'summary' | 'summary_large_image'
    /**
    * The locale of the current page
    */
    video?: string
    /**
    * The locale of the current page
    */
    height?: string
    /**
    * The locale of the current page
    */
    width?: string
}

const CEO = ({
    title,
    url,
    description,
    twitter_card,
    type,
    image,
    video,
    width,
    height,
    index
}: CEOProps) => {

  // useEffect(() => {
  //   const CEOvalidator = async () => {
  //       if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') return;
  //       if (!title) throw new Error(`CEO:This title missing.`);
  //       if (!description) throw new Error(`CEO:This description is missing.`)
  //       if (!image) throw new Error(`CEO:Missing image`);
  //       if (image) {
  //         if (!width || !height) {
  //           throw new Error(`CEO: Image is missing required width and height!`)
  //         }
  //       }
  //   }
  //   CEOvalidator();
  // }, [description, height, image, title, width])

  return (
    <Head>
      <title>{title?.substring(0, 70)}</title>
      <meta name="description" content={description?.substring(0, 160)} key={'description'} />
      <meta property='og:ttl' content='600' key={'ogttl'} />
      <meta property="og:site_name" content="bbabystyle" key={'ogsite_name'} />
      <meta property="twitter:card" content={twitter_card} key="twcard" />
      <meta property="og:title" content={title?.substring(0, 70)} key="ogtitle" />
      <meta property="twitter:title" content={title?.substring(0, 70)} key='twitter_title' />
      <meta property="og:description" content={description?.substring(0, 160)} key="ogdesc" />
      <meta property="og:image" content={image} key="ogimage" />
      <meta property="twitter:image" content={image} key={'twitter_image'} />
      {image && (
        <>
          <meta property='og:image:width' content={width} />
          <meta property='og:image:height' content={height} />
        </>
      )}
      {!index && (
        <meta name="robots" content="noindex" key={'noindex'} />
      )}
      {video && <meta property="og:video" content={video} />}
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:type" content={type} key="ogtype" />
      <link rel='canonical' href={url.toLowerCase()} key='canonical' />
    </Head>
  )
}

export default CEO;
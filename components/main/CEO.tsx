import Head from "next/head";

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
    locale?: string
    /**
    * Use article for articles and website for the rest of your pages.
    */
    twitter_card: string
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
    height
}:CEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key={'description'} />
      <meta property='og:ttl' content='600' key={'ogttl'} />
      <meta property="og:site_name" content="bbabystyle" key={'ogsite_name'} />
      <meta property="twitter:card" content={twitter_card} key="twcard" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      {image && (
        <>
          <meta property="og:image" content={image} key="ogimage" />
          <meta property='og:image:width' content={width} />
          <meta property='og:image:height' content={height} />
          <meta property="twitter:image" content={image} />
        </>
      )}
      {video && <meta property="og:video" content={video} />}
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:type" content={type} key="ogtype" />
      <link rel='canonical' href={url} key='canonical' />
    </Head>
  )
}

export default CEO;
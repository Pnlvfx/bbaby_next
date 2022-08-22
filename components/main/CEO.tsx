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
    description: string;
    type: 'article' | 'website'
    twitter_card: string
    image: string | undefined
}

const CEO = ({
    title,
    url,
    description,
    twitter_card,
    type,
    image,

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
      <meta property="og:image" content={image} key="ogimage" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:type" content={type} key="ogtype" />
      <link rel='canonical' href={url} key='canonical' />
    </Head>
  )
}

export default CEO;
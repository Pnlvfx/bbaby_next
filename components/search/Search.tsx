import Head from "next/head"

const Search = () => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME
    const imagePreview = `${hostname}/imagePreview.png`;
    const title = `Bbabystyle.com: search result`
    const url = `${hostname}/search`
    const description = "Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle."
    const card = 'summary';
  return (
    <div>
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} key={'description'} />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta property="og:site_name" content="bbabystyle" key={'ogsite_name'} />
        <meta property="twitter:card" content={card} key="twcard" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={imagePreview} key="ogimage" />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
    </div>
  )
}

export default Search
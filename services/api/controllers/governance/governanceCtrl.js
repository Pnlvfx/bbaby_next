import Post from '../../models/Post.js'
import textToImage from 'text-to-image'
import fs from 'fs'

const governanceCtrl =  {
    createImage: async (req,res) => {
        try {
            let skip = 0
            const limit = 1

            const createImage = async() => {
                const bgColor = '#1a1a1b'
                const textColor = 'rgb(215, 218, 220)'
                const website = 'www.bbabystyle.com'
                const post = await Post.findOne({}).sort({createdAt: -1}).limit(limit).skip(skip)
                const data = await textToImage.generate(`${post?.title}\n\n${post.body}\n\n\n\n${website}`, {
                    maxWidth: 1920,
                    bgColor: bgColor,
                    textColor: textColor,
                    customHeight: 1080,
                    fontSize: 48,
                    lineHeight: 48,
                    textAlign: 'center',
                    verticalAlign: 'center'
                })
                const clean = await data.replace(/^data:image\/\w+;base64,/, "")
                const buf = Buffer.from(clean, 'base64')
                fs.writeFile(`./youtubeImage/image${skip}.png`, buf, function(err,image) {
                    if (err) {
                        console.log(err)
                    }
                })      
            }
            if (skip === 0) {
                await createImage()
                skip = 1
                if (skip === 1) {
                    await createImage()
                    skip = 2
                    if (skip === 2) {
                        await createImage()
                        res.json({msg: 'all three image are being created'})
                    }
                }
            }

        } catch (err) {
            
        }
    }
}

export default governanceCtrl;
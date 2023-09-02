export default function buildLoader(strapiImage) {
    console.log(strapiImage)
    const formats = Object.values(strapiImage.formats).sort((a,b) => a.width - b.width)
    formats.push({width: strapiImage.width, url: strapiImage.url})

    return ({width}) => {
        for(let i = 0; i < formats.length; i++) {
            if(width < formats[i].width) return `${process.env.NEXT_PUBLIC_STRAPI_URL}${formats[i].url}`
        }

        return `${process.env.NEXT_PUBLIC_STRAPI_URL}${formats[formats.length - 1].url}`
    }
}

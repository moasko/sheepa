/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["images.unsplash.com","www.zangochap.com","res.cloudinary.com"],
    },
    reactStrictMode:true,
    env:{
        API_URL:process.env.APP_URL,
    }
}


module.exports = nextConfig

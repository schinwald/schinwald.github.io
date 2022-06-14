export const fetchContentful = async (key: string) => {
	const contentful = require('contentful')

    try {
        if (process.env.CONTENTFUL_API_KEY === undefined ||
            process.env.CONTENTFUL_ENVIRONMENT === undefined ||
            process.env.CONTENTFUL_HOST === undefined) {
            throw 'Environment variables not set'
        }
    
        const client = contentful.createClient({
            space: '8q0xl0zz73ut',
            accessToken: process.env.CONTENTFUL_API_KEY,
            environment: process.env.CONTENTFUL_ENVIRONMENT,
            host: process.env.CONTENTFUL_HOST
        })
        
        const data = await client.getEntries(key)
        return JSON.stringify(data)
    } catch (error) {
        console.error(error)
        return null
    }
}
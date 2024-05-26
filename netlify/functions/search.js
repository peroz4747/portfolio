const axios = require('axios')

exports.handler = async function (event, context) {
  const query = event.queryStringParameters.q
  const API_KEY = process.env.GOOGLE_API_KEY
  const CX = process.env.GOOGLE_CX

  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: API_KEY,
        cx: CX,
        q: query
      }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    }
  } catch (error) {
    console.error('Error fetching search results:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching search results' })
    }
  }
}

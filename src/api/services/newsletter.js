import client from '../client'

export const subscribeToNewsletter = async (data) => {
  try {
    const response = await client.put('/Newsletter/subscribe', {
      userId: data.userId,
      username: data.username,
      email: data.email
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to subscribe to newsletter')
  }
}

import type { APIRoute } from 'astro'

interface RoomInfo {
  live_status: number
  title: string
  online: number
  attention: number
  live_time: string
  keyframe: string
}

export interface BiliResponse {
  code: number
  message: string
  data: RoomInfo
}


export const get: APIRoute = async({ params, request }) => {
  const response = await fetch('https://api.live.bilibili.com/room/v1/Room/get_info?room_id=652581')
  const data = await response.json() as BiliResponse

  if (data.code !== 0) {
    return {
      body: JSON.stringify({
        code: data.code,
        message: data.message
      })
    }
  }

  return {
    body: JSON.stringify({
      code: 0,
      data: {
        live_status: data.data.live_status,
        title: data.data.title,
        online: data.data.online,
        attention: data.data.attention,
        live_time: data.data.live_time,
        keyframe: data.data.keyframe,
      }
    })
  }
}
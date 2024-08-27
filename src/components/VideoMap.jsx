import React from 'react'
import '../style/video.css'

const VideoMap = ({ item }) => {
  return (

    <div className='video-content'>
        <iframe src={item.url} />
    </div>

  )
}

export default VideoMap
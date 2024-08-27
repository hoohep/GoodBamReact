import React from 'react'
import '../style/video.css'

const VideoMap = ({item}) => {
  return (
    <div>
        <div className='video-content'>
            <iframe src={item.url}/>
        </div>
    </div>
  )
}

export default VideoMap
import React, { useState } from 'react'
import useAuth from '../Hooks/Auth';
import VideoMap from './VideoMap';
import data from '../json/videoList.json';
import '../style/video.css'


const Video = () => {

    useAuth();

    return (
        <div>
            <div className='video-title'>
                수면 영상 테라피
                <p>하루의 끝을 마무리하며 잠 못드는 밤, 함께 잠들어요</p>
            </div>

            <div className='video-container'>
                {data.video.map((item) => (
                    <VideoMap key={item.no} item={item} />      
                ))}
            </div>

        </div>
    )
}

export default Video
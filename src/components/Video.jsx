import React, { useEffect, useRef, useState } from 'react'
// import useAuth from '../Hooks/Auth';
import data from '../json/videoList.json';
import '../style/video.css'

const Video = () => {

    // useAuth();
    
    const [currentVideos, setCurrentVideos] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const loader = useRef(null);
    const scrollToTopButton = useRef(null);

    // 랜덤 인덱스 배열 생성 함수
    const getRandomIndexArray = (length) => {
        const indices = Array.from({ length }, (_, i) => i);
        for (let i = length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]]; // 배열 요소 교환
        }
        return indices;
    };

    // 랜덤 비디오 로드 함수
    const loadRandomVideos = () => {
        const indices = getRandomIndexArray(data.video.length);
        const newVideos = indices.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map(index => data.video[index]);
        setCurrentVideos(prevVideos => [...prevVideos, ...newVideos]);
    };

    // 스크롤 이벤트 처리
    const handleScroll = () => {
        if (loader.current) {
            const { bottom } = loader.current.getBoundingClientRect();
            if (bottom <= window.innerHeight) {
                setPage(prevPage => {
                    const nextPage = prevPage + 1;
                    // loadVideos();
                    loadRandomVideos();
                    return nextPage;
                });
            }
            // 스크롤 위치에 따라 버튼 보이기/숨기기
            if (window.scrollY > 300) {
                scrollToTopButton.current.style.display = 'block';
            } else {
                scrollToTopButton.current.style.display = 'none';
            }
        }
    };

    // 페이지 최상단으로 스크롤
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    useEffect(() => {
        // 새로고침 시 랜덤 비디오 로드
        setCurrentVideos([]); // 이전 비디오 초기화
        setPage(1); // 페이지 초기화
        loadRandomVideos();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>

            <div className='video-container'>
                <div className='video-title'>
                    수면 영상 테라피
                    <p>하루의 끝을 마무리하며 잠 못드는 밤, 함께 잠들어요</p>
                </div>

                <div className='video-content'>
                    {currentVideos.map(video => (

                        <iframe key={video.no} src={video.url} />

                    ))}
                </div>

                <div ref={loader} className='loading'>
                    Loading more videos...
                </div>
                {/* 최상단으로 이동 버튼 */}
                <button
                    className='scroll-to-top-button'
                    ref={scrollToTopButton}
                    onClick={scrollToTop}
                >
                    Top
                </button>
            </div>

        </div>

    )

}
export default Video
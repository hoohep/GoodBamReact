import React, { useEffect, useRef, useState } from 'react'
import useAuth from '../Hooks/Auth';
import VideoMap from './VideoMap';
import data from '../json/videoList.json';
import '../style/video.css'
import axios from 'axios';



const Video = () => {

    useAuth();

    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const elementRef = useRef(null);

    const onIntersection = (entries) => {
        const firstEntry = entries[0];

        // 첫 번째 entry가 화면에 나타나고 
        //더 많은 데이터를 불러올 수 있는 상태(hasMore)인 경우 fetchMoreItems 함수를 호출.
        if (firstEntry.isIntersecting && hasMore && !loading) {
            fetchMoreItems();
        }
    };

    // 컴포넌트 렌더링 이후에 실행되며 Intersection Observer를 설정
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection, {
            rootMargin: '100px',
        });

        // elementRef가 현재 존재하면 observer로 해당 요소를 관찰.
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        // 컴포넌트가 언마운트되거나 더 이상 관찰할 필요가 없을 때(observer를 해제할 때) 반환.
        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [hasMore, loading]);

    const fetchMoreItems = async () => {
        setLoading(true);

        try {
            // 새로운 데이터를 불러올 API 엔드포인트에 요청을 보낸다.
            const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10}`);
            // 응답 데이터를 JSON 형식으로 파싱한다.
            const jsonData = await response.json();

            // 만약 더 이상 불러올 상품이 없다면 hasMore 상태를 false로 설정한다.
            if (jsonData.products.length === 0) {
                setHasMore(false);
            } else {
                // 불러온 데이터를 현재 상품 목록에 추가한다.
                // 이전 상품 목록(prevProducts)에 새로운 데이터(data.preoducts)를 연결
                setProducts((prevProducts) => [...prevProducts, ...jsonData.products]);

                // 페이지 번호를 업데이트하여 다음 요청에 올바른 skip 값을 사용
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error('Failed to fetch items', error);

        } finally {
            setLoading(false);
        }
    }




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




                {/* {hasMore && !loading && (
                    <div ref={elementRef}>
                        Load More Items
                    </div>
                )}
                {loading && (
                    <div>
                        Loading...
                    </div>
                )} */}


            </div>

        </div>

    )

}
export default Video
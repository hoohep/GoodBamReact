import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import homeLogo from '../assets/title.png'
import homeImg1 from '../assets/home_img01.png'
import modal from '../assets/modal.png'
import service1 from '../assets/service_img01.png'
import service2 from '../assets/service_img02.png'
import { motion } from 'framer-motion';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

const MainTitle = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items : center;
  text-align : left;
`;

const Section = styled.section`
  margin: 0 auto 40px auto;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 800px;
  width: 100%;

  img {
    margin-top: 20px;
  }
`;

const Title = styled.h2`
  font-size: 2em;
  margin-top: 20px;
  color: #333333;
`;

const Paragraph = styled.p`
  font-size: 1em;
  line-height: 1.6;
  color: #000;
`;

const CustomDots = styled.div`
  .slick-dots {
    bottom: 2px; /* 위치 조정 */
  }

  .slick-dots li button:before {
    color: #000; /* 점 색상 */
  }

  .slick-dots li.slick-active button:before {
    color: #FF5A9F; /* 활성화된 점 색상 */
  }
`;

const SlideContent = styled.div`
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  height: 260px;
  color: #6356F8;
  font-size: 22px;
  font-weight: bold;

  img {
    display: block;
    margin: 10px auto;
  }
`;

const Home = () => {
    const [sections, setSections] = useState([
        { id: 1, title: '하루의 마무리를 함께 해요.', content: '잠못드는 밤, 굿밤과 함께라면', img: `${homeImg1}` },
        { id: 2, title: 'Our Service', content: '서비스 장점 소개 내용이 여기에 들어갑니다. 서비스의 특징, 혜택, 사용자 리뷰 등을 포함할 수 있습니다.' },
        { id: 3, title: '추가 탭 1', content: '추가 탭 1의 내용 예문입니다. 관련된 정보나 설명이 여기에 들어갑니다.' },
        { id: 4, title: '추가 탭 2', content: '추가 탭 2의 내용 예문입니다. 관련된 정보나 설명이 여기에 들어갑니다.' },
        { id: 5, title: '추가 탭 3', content: '추가 탭 3의 내용 예문입니다. 관련된 정보나 설명이 여기에 들어갑니다.' },
    ]);

    const loadMoreContent = useCallback(() => {
        // 더 많은 콘텐츠를 로드할 수 있는 기능을 구현할 수 있습니다.
        // 현재는 고정된 데이터만 사용합니다.
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                >= document.documentElement.offsetHeight - 5
            ) {
                loadMoreContent();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loadMoreContent]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false, // 좌우 버튼을 없앱니다
    };

    return (
        <PageContainer>
            <ContentContainer>

                {/* 최상단 타이틀 */}
                <MainTitle>
                    <motion.img src={homeLogo}
                        style={{ width: '360px' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1.5,
                            delay: 0.5,
                            ease: [0.3, 0.71, 0.2, 1]
                        }}
                    />
                    <div>
                        <h1 style={{ fontSize: '36px' }}>굿밤, Good Bam</h1>
                        <p style={{ marginRight: '30px', marginTop: '10px' }}>
                            굿밤 서비스는 사용자의 생활패턴을 기반으로 나의 수면상태를<br /> 분석하여 맞춤형 솔루션을 제공하는 서비스입니다.
                            <br />오직 나만을 위한, 나에게 맞는 수면 방향을 찾아보아요.</p>
                    </div>
                </MainTitle>

                {sections.map((section) => (
                    // 슬라이드하는 모달
                    section.title === 'Our Service' ? (
                        // 모션 애니메이션 속성
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 2,
                                y: { duration: 1 },
                            }}>
                            <Section key={section.id}>
                                <Title>{section.title}</Title>
                                <CustomDots>
                                    {/* 슬라이드 */}
                                    <Slider {...sliderSettings}>
                                        <SlideContent>생활패턴 기반 수면분석
                                            <img src={modal} />
                                        </SlideContent>
                                        <SlideContent>분석 결과와 솔루션 제공
                                            <img src={service2} />
                                        </SlideContent>
                                        <SlideContent>수면 질 향상을 위한 영상 테라피
                                            <img src={service1} />
                                        </SlideContent>
                                    </Slider>
                                </CustomDots>
                            </Section>
                        </motion.div>
                    )
                        :
                        (
                            // 그 외 모든 모달
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{
                                    ease: 'easeInOut',
                                    duration: 2,
                                    y: { duration: 1 },
                                }}>
                                <Section key={section.id}>
                                    <Title>{section.title}</Title>
                                    <Paragraph>{section.content}</Paragraph>

                                    <motion.img src={section.img} style={{ height: '400px' }}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{
                                            ease: 'easeInOut',
                                            duration: 2,
                                            y: { duration: 1 },
                                        }} />
                                </Section>
                            </motion.div>
                        )
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 2,
                        y: { duration: 1 },
                    }}>
                    새로운 공간
                </motion.div>
            </ContentContainer>
        </PageContainer>
    );
};

export default Home;

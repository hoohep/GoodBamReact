import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {

    const nav = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            // 토큰 담기
            const token = localStorage.getItem('token');

            // 토큰이 없으면 로그인 페이지로 리다이렉트
            if (!token) {
                return nav('/login', { replace: false });
            }

            // let isValid = false;
            let isValid = await validateToken(token);

            if (!isValid) {
                localStorage.removeItem('token');  // 유효하지 않은 토큰이면 삭제
                nav('/login', { replace: true });  // 로그인 페이지로 리다이렉트
            }

        }

        checkAuth();

    }, [nav]);
};


const validateToken = async (token) => {
    // JWT 토큰의 유효성 검사 (단순 만료 시간 체크 예시)
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // JWT의 payload 부분 디코딩
        const expiry = payload.exp * 1000; // 만료 시간은 초 단위이므로 밀리초로 변환
        return expiry > Date.now();  // 현재 시간과 비교하여 유효성 확인
    } catch (e) {
        return false;  // 토큰이 변조되었거나 잘못된 경우
    }

};

export default useAuth;
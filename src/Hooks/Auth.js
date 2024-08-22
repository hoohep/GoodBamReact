import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            // 토큰 담기
            const token = localStorage.getItem('token');

            // 토큰이 없으면 로그인 페이지로 리다이렉트
            if (!token) {
                navigate('/login', { replace: true });
                return;
            }
            
            // 카카오 액세스 토큰의 경우
            const isKakaoToken = token.startsWith('kakao_'); // 토큰이 카카오 토큰인지 확인하는 로직
            // let isValid = false;
            let isValid = validateToken(token);

            if (isKakaoToken) {
                const result = await validateKakaoToken(token);
                isValid = result.valid;
            } else {
                isValid = validateJwtToken(token);
            }

            if (!isValid) {
                localStorage.removeItem('token');  // 유효하지 않은 토큰이면 삭제
                navigate('/login', { replace: true });  // 로그인 페이지로 리다이렉트
            }

        }

        checkAuth();

    }, [navigate]);
};

const validateJwtToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // JWT의 payload 부분 디코딩
      const expiry = payload.exp * 1000; // 만료 시간은 초 단위이므로 밀리초로 변환
      return expiry > Date.now();  // 현재 시간과 비교하여 유효성 확인
    } catch (e) {
      return false;  // 토큰이 변조되었거나 잘못된 경우
    }
  };
  
  const validateKakaoToken = async (token) => {
    try {
      const response = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // 유효한 토큰일 경우
        const userData = await response.json();
        return { valid: true, userData };
      } else {
        // 유효하지 않은 토큰
        return { valid: false, message: 'Invalid token' };
      }
    } catch (error) {
      // 네트워크 오류 등의 예외 처리
      return { valid: false, message: error.message };
    }
  };
  
  

const validateToken = (token) => {
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
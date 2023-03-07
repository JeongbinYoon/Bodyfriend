# 기획 의도
기존 HTML, CSS, JavaScript, JQuery로 구현된 바디프랜드 웹사이트를 CSR을 채택한 SPA로 리뉴얼해보고자 리액트 환경에서 프로젝트 진행

## 사용 기술
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=PostCSS&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=orange"/>

## 모바일 접속 QR코드
<img src="https://user-images.githubusercontent.com/86540140/223289305-fa969406-22a9-4785-a45d-4e1170ed5506.png" width="200"><br/>

# 구현 사항
+ 회원가입/로그인
+ 메인 페이지
+ 마이 페이지
+ 상품 더보기
+ 상품 상세정보
+ 주문/결제
+ 렌탈상담신청
+ 관리자 페이지

***

+ ### 회원가입 / 로그인 페이지
#### - 로그인 플로우 차트 <br/>
<img src="https://user-images.githubusercontent.com/86540140/205779691-45e442c4-9b6b-43c2-b97e-0dac13b6f3a1.jpg" width="600"><br/>

#### - 로그인 / 회원가입 <br/>
**유효성 검사**<br/>
React Hook Form을 활용하여 입력 값 유효성 검사 및 에러처리<br/>
<img src="https://user-images.githubusercontent.com/86540140/205780483-efead2dd-bc24-484b-9742-5fea832dcc3a.jpg" width="360"><br/>
**알림창 모듈화**<br/>
하나의 컴포넌트로 다양한 타입의 알림창을 보여주어 재사용성 높임<br/>
<img src="https://user-images.githubusercontent.com/86540140/205781727-8fabb6b5-dba1-4481-bf95-e8bad9cedabe.jpg" width="600"><br/>

***

+ ### 메인 페이지
#### - 메인 <br/>
**Firebase database 로드 항목**<br/>
상품 이름, 이미지 URL, 판매가, 렌탈가<br/><br/>
<img src="https://user-images.githubusercontent.com/86540140/205786025-76c8ff40-a17f-41ed-b069-92f4c8d5aa69.jpg" width="460"><br/>

***

+ ### 상품 정보
**상품 정보**<br/>
선택한 상품 데이터를 요청하여 보여줌<br/>
<img src="https://user-images.githubusercontent.com/86540140/205787331-e8e6b1b7-8b39-4d90-a0bc-d377f30a5ac1.jpg" width="660"><br/>


**상품정보 옵션**<br/>
<img src="https://user-images.githubusercontent.com/86540140/205787667-a28b3a54-d155-4aa0-be82-a3f3bc99aed7.jpg" width="660"><br/>

***

+ ### 주문/결제, 렌탈 상담신청
#### - 주문 결제 및 렌탈 상담 신청 플로우 차트 <br/>
<img src="https://user-images.githubusercontent.com/86540140/205787929-6f491501-0f59-4b4e-918e-f3ef6d460811.jpg" width="600"><br/>


#### - 주문 결제 및 렌탈 상담 신청 <br/>
<img src="https://user-images.githubusercontent.com/86540140/205788721-c77509bb-02d1-42cd-a314-cec562491c0c.jpg" width="600"><br/>

#### - 결제 <br/>
결제연동 사용 라이브러리: 부트페이<br/>
<img src="https://user-images.githubusercontent.com/86540140/205788999-36e3c10b-f19f-4b96-aaa9-e9035d50ae2d.jpg" width="800"><br/>

***

+ ### 마이페이지
#### - 회원가입한 사용자별 주문 데이터 조회 <br/>
<img src="https://user-images.githubusercontent.com/86540140/205789306-05cca715-ab93-4cf8-b17a-edc4b2b0c269.jpg" width="700"><br/>

***

+ ### 전시장 찾기
#### - 지역별 바디프랜드 전시장 찾기 <br/>
<img src="https://user-images.githubusercontent.com/86540140/205789441-2f92740f-768d-4e44-a332-b5a9e74afac2.jpg" width="800"><br/>

***

+ ### 관리자 페이지
#### - 제품을 등록, 삭제할 수 있는 제품 관리 페이지 <br/>
<img src="https://user-images.githubusercontent.com/86540140/205789914-d410afaf-e89f-4808-83cc-0fdb185f1730.jpg" width="800"><br/>

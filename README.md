
## 프로젝트 소개
**BudgetBuddy (FrontEnd)**  
> React 공부를 목적으로 진행중인 가계부 프로젝트입니다. 회원별로 수입/지출 내역을 관리할 수 있습니다. 컴포넌트들을 결합해서 UI를 구현하고, 이런 컴포넌트들의 구조에 대해 고민하며 구현하고 있습니다. state를 이용해서 동적인 화면을 만들고, props를 이용해 부모와 자식 컴포넌트 간 데이터를 전달하였습니다.  

* * *   
⚙️ 기술스택
-------------
**Environment**  
<img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"/> 
  
**Development**  
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> 
  
**Config**  
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/> 

* * *     
🖥️ 화면구성
-------------
|로그인|회원가입|
|---|---|
|![login](https://github.com/user-attachments/assets/9b235353-d5e7-4904-8222-8fd3ee1628e6)|![image](https://github.com/user-attachments/assets/339ec25b-4ce5-452e-abd2-2e2318a2325b)|

|가계부|추가/수정 모달창|
|---|---|
|![budget](https://github.com/user-attachments/assets/f55740a0-e157-44e5-bd28-831068faa770)|![image](https://github.com/user-attachments/assets/ff1eb14f-ccb0-4888-b38d-41df1b65a5d9)|

* * *     
📌 기능
-------------
⭐ **회원가입**
- ID, PW, 닉네임, EMAIL을 지정한 형식에 맞게 회원 등록
  - ID : 영어와 숫자 조합 5~20자, 기존 아이디와 중복 불가
  - PW : 영문, 숫자, 특수문자 조합 8~16자, 비밀번호 확인
  - 닉네임 : 최대 6글자, 중복 가능
  - EMAIL : 기존 이메일과 중복 불가
    - EMAIL 인증 기능 추가 예정 
 
⭐ **로그인**
- 등록된 회원과 정보가 일치한다면 로그인
  - 카카오/네이버 통합 로그인 기능 추가 예정

⭐ **가계부**
- 로그인한 회원의 월별 수입/지출 내역 최신순으로 조회
- 수입/지출에 대한 내역은 추가, 수정, 삭제 가능

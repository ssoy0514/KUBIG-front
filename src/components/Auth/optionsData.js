const DEPARTMENT_OPTIONS = [
  "국어국문학과",
  "철학과",
  "한국사학과",
  "사학과",
  "사회학과",
  "한문학과",
  "영어영문학과",
  "독어독문학과",
  "불어불문학과",
  "중어중문학과",
  "노어노문학과",
  "일어일문학과",
  "서어서문학과",
  "언어학과",
  "생명과학부",
  "생명공학부",
  "식품공학과",
  "환경생태공학부",
  "식품자원경제학과",
  "정치외교학과",
  "경영학과",
  "경제학과",
  "통계학과",
  "행정학과",
  "수학과",
  "물리학과",
  "화학과",
  "지구환경과학과",
  "화공생명공학과",
  "신소재공학부",
  "건축사회환경공학부",
  "건축학과",
  "기계공학부",
  "산업경영공학부",
  "전기전자공학부",
  "융합에너지공학과",
  "반도체공학과",
  "차세대통신학과",
  "의(예)학과",
  "교육학과",
  "국어교육과",
  "영어교육과",
  "지리교육과",
  "역사교육과",
  "가정교육과",
  "수학교육과",
  "체육교육과",
  "간호학과",
  "컴퓨터학과",
  "데이터과학과",
  "디자인조형학부",
  "국제학부",
  "글로벌한국융합학부",
  "미디어학부",
  "바이오의공학부",
  "바이오시스템의과학부",
  "보건환경융합과학부",
  "보건정책관리학부",
  "자유전공학부",
  "스마트모빌리티학부",
  "스마트보안학부",
  "사이버국방학과",
  "심리학부",
];
const getCurrentYear = () => {
  const now = new Date();
  return now.getFullYear();
};

const generateGradeOptions = (fromYear) => {
  const currentYear = getCurrentYear();
  const years = Array.from(
    { length: currentYear - fromYear + 1 },
    (_, index) => currentYear - index
  );
  const gradeOptions = years.map((year) => (year % 100).toString().padStart(2, 0));
  gradeOptions.push(-1);
  return gradeOptions;
};

const GRADE_OPTIONS = generateGradeOptions(2000);

export default {
  DEPARTMENT_OPTIONS,
  GRADE_OPTIONS,
};

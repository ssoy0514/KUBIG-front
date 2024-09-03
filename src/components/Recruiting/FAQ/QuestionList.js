import QuestionItem from "./QuestionItem";

export default function QuestionList({ QUESTIONS, isAdmin }) {
  return (
    <>
      {QUESTIONS.map((q, i) => (
        <QuestionItem
          key={i}
          faq={q}
          isAdmin={isAdmin}
          last={i === QUESTIONS.length - 1 ? true : false}
        />
      ))}
    </>
  );
}
// const QUESTIONS = [
//   {
//     question: "KUBIG에 지원하는데 있어서 필요한 지식은 무엇인가요?",
//     answer:
//       "입회후 신입회원교육을 6주간 받으며 매주 토요일에 진행되는 정규 세미나에 참석하게 됩니다.\r\n 정규 세미나는 한주간의 경제 이슈에 대한 토론, 회원들의... \r\n입회후 신입회원교육을 6주간 받으며 매주 토요일에 진행되는 정규 세미나에 참석하게 됩니다. \r\n정규 세미나는 한주간의 경제 이슈에 대한 토론, 회원들의...",
//   },
//   {
//     question: "KUBIG에 지원하는데 있어서 필요한 지식은 무엇인가요?",
//     answer:
//       "입회후 신입회원교육을 6주간 받으며 매주 토요일에 진행되는 정규 세미나에 참석하게 됩니다.\r\n 정규 세미나는 한주간의 경제 이슈에 대한 토론, 회원들의...\r\n 입회후 신입회원교육을 6주간 받으며 매주 토요일에 진행되는 정규 세미나에 참석하게 됩니다. \r\n정규 세미나는 한주간의 경제 이슈에 대한 토론, 회원들의...",
//   },
// ];

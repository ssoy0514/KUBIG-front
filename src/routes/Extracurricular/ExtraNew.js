import { NewWrapper } from "../../components/Studies/StudyEdit";
import ExtraInput from "../../components/Extracurricular/ExtraInput";

export default function ExtraNew() {
  return (
    <NewWrapper>
      <ExtraInput
        existingContent={""}
        existingDate={""}
        existingSelected={""}
        existingTitle={""}
        id={null}
      />
    </NewWrapper>
  );
}

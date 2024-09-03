import StudyEdit from "../../components/Studies/StudyEdit";
import withAuth from "../../lib/wihAuth";

function StudyNew() {
	return <StudyEdit />;
}

export default withAuth(StudyNew);
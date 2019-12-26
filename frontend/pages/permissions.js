import PleaseSignin from "../components/PleaseSignin";
import Permissions from "../components/Permissions";
import { ALL_USERS_QUERY } from "../components/Permissions";

const PermissionsPage = props => (
	<div>
		<PleaseSignin>
			<Permissions />
		</PleaseSignin>
	</div>
);
export default PermissionsPage;

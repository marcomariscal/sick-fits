import Link from "next/link";
import Reset from "../components/Reset";

const Sell = props => <Reset resetToken={props.query.resetToken} />;
export default Sell;

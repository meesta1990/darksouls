import { Session } from "./Session";
import { User } from "./User";

interface CommonSessionInterface {
    session: Session;
    user: User;
    onFocus?: any;
    focused?: boolean;
}

export default CommonSessionInterface;

import classNames from "classnames";
import loader from '../../assets/images/loader.gif';
import './Loader.css'

interface ILoader {
    loading: boolean;
    className?: string;
}

const Loader = ({ loading= false, className }: ILoader) => {
    if(!loading) return null;
    return (
        <span className={classNames("loader", className)}>
            <img src={loader} />
        </span>
    )
};

export default Loader;
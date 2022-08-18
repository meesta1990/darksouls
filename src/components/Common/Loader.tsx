import loader from '../../assets/images/loader.gif';
import './Loader.css'

const Loader = ({loading= false}) => {
    if(!loading) return null;
    return (
        <span className="loader">
            <img src={loader} />
        </span>
    )
};

export default Loader;
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <Link className="NavButton" to="/">Home</Link>
            <Link className="NavButton" to="/improve">Improve</Link>
        </nav>
    );
};

export default Navigation;
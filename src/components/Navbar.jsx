import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="nav">
            <div className="dhongorsho">
                <Link to="/">
                    <p>Dhongorsho</p>
                </Link>
            </div>
            <div className="infos">
                <Link to="/">
                    <p>Home</p>
                </Link>
                <Link to="/about">
                    <p className='categories'>Categories</p>
                    <div className="dropdown-menu">
                        <p>Category 1</p>
                        <p>Category 2</p>
                        <p>Category 3</p>
                    </div>
                </Link>
                <Link to="/contact">
                    <p>Contact</p>
                </Link>
            </div>
            
            <div className="buttons">
                <Link to="/login">
                    <button className="login-button">Login</button>
                </Link>
                <Link to="/signup">
                    <button className="signup-button">Sign Up</button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar

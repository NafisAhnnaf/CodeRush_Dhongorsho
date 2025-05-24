import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="nav">
            <div className="infos">
                <Link to="/"><p>Home</p></Link>
                <Link to="/about" className="dropdown">
                    <p className='categories'>Categories</p>
                    <div className="dropdown-menu">
                        <p>Category 1</p>
                        <p>Category 2</p>
                        <p>Category 3</p>
                    </div>
                </Link>
                <Link to="/contact"><p>Contact</p></Link>
                <Link to="/dashboard"><p>Dashboard</p></Link>
            </div>

            <div className="center">
                <div className="dhongorsho">
                    <Link to="/"><p>Dhongorsho</p></Link>
                </div>
            </div>

            <div className="buttons">
                
                <Link to="/cart"><button className="cart-icon"><img  src="src/assets/shopping-cart.svg" alt="" /></button></Link>
                <Link to="/login"><button className="login-button-navbar">Login</button></Link>
                <Link to="/signup"><button className="signup-button">Sign Up</button></Link>
            </div>
        </div>
    )
}



export default Navbar

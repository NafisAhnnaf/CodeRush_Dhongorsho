import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Navbar() {
    // const [isLogged, setIsLogged] = useState(false);
    // const id = localStorage.getItem('userID');

    // useEffect(()=>{
    //     if(id){
    //         setIsLogged(true);
    //     }
    //     else{
    //         setIsLogged(false);
    //     }
    // }, [id])
    return (
        <div className="nav">
            <div className="infos">
                <Link to="/"><p>Home</p></Link>
                <Link to="/shop" className="dropdown">
                    <p className='categories'>Marketplace</p>
                    <div className="dropdown-menu">
                        <p>Electronics</p>
                        <p>Stationaries</p>
                        <p>Accessories</p>
                        <p>Tutoring</p>
                    </div>
                </Link>
                <Link to="/upload"><p>Upload</p></Link>
                <Link to="/dashboard"><p>Admin Panel</p></Link>
                <Link to="/chatbot"><p>Chatbot</p></Link>
                
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
                <div className="profile-icon">
                    <button>Profile</button>
                    <div className="dropdown-profile">
                        <Link to="/profile"><p>Profile</p></Link>
                        <Link><p>Logout</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Navbar

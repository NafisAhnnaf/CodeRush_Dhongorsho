function SignupPage() {
    return (
        <div className="signup-mains">
            <div className="signup-body">
                <h2>Sign Up</h2>
                <form className="signup-form">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" type="text" className="signup-input" placeholder="Enter your name" />

                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" className="signup-input" placeholder="Enter your email" />

                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" className="signup-input" placeholder="Choose a username" />

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" className="signup-input" placeholder="Create a password" />

                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;

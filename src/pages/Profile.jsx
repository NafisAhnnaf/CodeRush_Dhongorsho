import React, {useState} from 'react'
//css is in signup.css
function Profile(){
    return(
        <div className="profile-mains">
            <h1>Profile</h1>
            <div className="profile-img">
                <img src="" alt="" />
            </div>
            <div className="profile-infos">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Tabib</th>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <th>tabibhassan.1604@iut-dhaka.edu</th>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <th>01300917471</th>
                    </tr>
                    <tr>
                        <th>Date Of Birth</th>
                        <th>14/04/2005</th>
                    </tr>
                    <tr>
                        <th>University</th>
                        <th>IUT</th>
                    </tr>
                    <tr>
                        <th>Program</th>
                        <th>SWE</th>
                    </tr>
                    <tr>
                        <th>Year</th>
                        <th>2023</th>
                    </tr>
                </table>
            </div>
        </div>
        

    )
}

export default Profile
 
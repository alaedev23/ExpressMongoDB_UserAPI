import React, { useContext } from 'react';
import UserContext from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, setUser, userNotes, setUserNotes } = useContext(UserContext);
    const navigate = useNavigate();

    const signOut = () => {
        setUser(null);
        setUserNotes([]);
        localStorage.removeItem('user');
        localStorage.removeItem('notes');
        navigate('/');
    };

    const deleteUser = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:8081/user/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                }, body: JSON.stringify({ id: user.id })
            });

            if (response.ok) {
                signOut();
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <section id="profile" style={{height: '910px'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                    <h2 className="fw-bold mb-5 text-uppercase">User Profile</h2>

                                    <table className="table table-dark table-sm table-borderless mx-auto">
                                        <tbody>
                                            <tr>
                                                <td><strong>Id:</strong></td>
                                                <td>{user && user.id}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Name:</strong></td>
                                                <td>{user && user.name}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Surname:</strong></td>
                                                <td>{user && user.surname}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Email:</strong></td>
                                                <td>{user && user.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                                <div>                                    
                                    {/* He preferit mostrar el button de signOut a la pagina del Profile */}
                                    <button onClick={signOut} className="btn btn-outline-light btn-lg mx-2 px-5">Sign Out</button>
                                    <button onClick={deleteUser} className="btn btn-outline-danger btn-lg mx-2 me-2">Delete Account</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;

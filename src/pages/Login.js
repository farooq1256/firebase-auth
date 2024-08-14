import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { Button } from 'react-bootstrap';

function Login() {
  let initialState = { email: "", password: "", displayName: "" };

  const [state, setState] = useState(initialState);
  const [user, setUser] = useState({});
  const [showUpdateInput, setShowUpdateInput] = useState(false); // New state variable

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        console.log("User is logged out");
      }
    });
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = state;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in successfully");
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    const { displayName } = state;
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, { displayName })
        .then(() => {
          console.log("Profile updated successfully");
          setUser({ ...user });
          setShowUpdateInput(false); // Hide the input field after updating
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const toggleUpdateInput = () => {
    setShowUpdateInput(!showUpdateInput);
  };

  return (
    <main>
      <div className="py-5 w-100">
        <div className="container">
          {user.email ? (
            <div className="row text-center text-white">
              <div className="col">
                <h2>User Email: {user.email}</h2>
                <h3>User Display Name: {user.displayName || "N/A"}</h3>
              </div>
              <div className="row text-center">
                <div className="col">
                  <Button className="btn btn-danger" onClick={handleLogOut}>
                    Logout
                  </Button>
                 <div className="row">
                  <div className="col">
                  <Button className="btn btn-success mt-4" onClick={toggleUpdateInput}>
                    {showUpdateInput ? "Cancel" : "Update Profile"}
                  </Button>
                  </div>
                 </div>
                  {showUpdateInput && (
                    <form onSubmit={handleProfileUpdate} className="mt-3">
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            name="displayName"
                            className="form-control"
                            placeholder="New Display Name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row text-center mt-3">
                        <div className="col">
                          <Button className="btn btn-success" type="submit">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <div className="card p-2 p-md-4 p-lg-5">
                  <h1 className="text-center mb-4">Login Form</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row text-center">
                      <div className="col">
                        <button className="btn btn-outline-success w-50">
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Login;

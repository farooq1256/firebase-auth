import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { doc, setDoc } from 'firebase/firestore';

function Register() {
  const initialState = { email: "", password: "" };
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User registered successfully");
      console.log(userCredential);
      console.log(user);

      await setDoc(doc(firestore, "users", user.uid), { fullName: "", uid: user.uid });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="py-5 w-100">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="card p-2 p-md-4 p-lg-5">
                <h1 className="text-center mb-4">Register Form</h1>
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
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;

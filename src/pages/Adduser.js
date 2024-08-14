import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore/lite";
import { firestore } from '../config/firebase';

function AddUser() {
  let initialState = { FullName: "", age: "", country: "" };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    try {
      const docRef = await addDoc(collection(firestore, "users"), state);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <main>
      <div className="py-5 w-100">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="card p-2 p-md-4 p-lg-5">
                <h1 className="text-center mb-4">Add User Form</h1>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        name="FullName"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="number"
                        name="age"
                        className="form-control"
                        placeholder="Age"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        placeholder="Country"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col">
                      <button className="btn btn-outline-success w-50">
                        Add User
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

export default AddUser;

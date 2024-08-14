import React, { useState, useEffect } from 'react';
import { collection, getDocs,doc, setDoc,deleteDoc } from "firebase/firestore";
import { firestore } from '../config/firebase';
import firebase from 'firebase/compat/app';

export default function ReadProducts() {
    const [products, setProducts] = useState([]);
    const [productForEdit, setProductForEdit] = useState({});

    const handleChange = e => {
        setProductForEdit({ ...productForEdit, [e.target.name]: e.target.value });
    };

    const fetchDocuments = async () => {
        let array = [];
        const querySnapshot = await getDocs(collection(firestore, "products"));
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            array.push(data);
        });
        setProducts(array);
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleEdit = (product) => {
        setProductForEdit(product)
        console.log(product)
    }

    const handleUpdate = async(product) => {
   console.log(product);

  
   await setDoc(doc(firestore, "products", product.id),product,{ merge: true });
   let newProduct = products.map((oldProduct)=>{
    if (oldProduct.id == product.id) {
        return product
        
    } else {
        return oldProduct
    }
   
   })
   setProducts(newProduct)
  console.log("product is apdated");
  setProductForEdit({})
    };

    const handleDelete = async(product) => {
        // console.log(product);
        await deleteDoc(doc(firestore, "products", product.id));
let newProduct = products.filter((newProduct)=>{
    return product.id !== newProduct.id
})
       setProducts(newProduct)
        console.log("prodect is deleted");
    };

    return (
        <>
            <main>
                <div className='py-5 w-100'>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1 className="text-white text-center">Products</h1>
                                <hr />
                                {products.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-light table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product, i) => (
                                                    <tr key={product.id}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{product.title}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.description}</td>
                                                        <td>
                                                            <button
                                                                className='btn btn-sm btn-info me-2'
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#editModal"
                                                                onClick={() => handleEdit(product)}
                                                            >
                                                                Update
                                                            </button>
                                                            <button
                                                                className='btn btn-sm btn-danger'
                                                                onClick={() => handleDelete(product)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <div className="spinner-border text-white"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* modles */}

            {/* <!-- Button trigger modal --> */}


{/* <!-- Modal --> */}
<div className="modal fade" id="editModal" >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" >Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Title" name='title'  value={productForEdit.title} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Description" name='description' value={productForEdit.description}  onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="Price" name='price'  value={productForEdit.price}  onChange={handleChange} />
                                        </div>
                                    </div>
                               
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleUpdate(productForEdit) }} >Apdate</button>
      </div>
    </div>
  </div>
</div>
        </>
    );
}

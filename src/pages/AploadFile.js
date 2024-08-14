import { useState } from "react";
import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState("");

  const handleUpload = () => {
    if (!file?.size) {
      console.log("File is not found");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const randomId = Math.random().toString(36).slice(2);
    const imagesRef = ref(storage, `images/${randomId}.${fileExt}`);
    const uploadTask = uploadBytesResumable(imagesRef, file);

    setIsUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");

        setProgress(progress);

        if (progress === 100) {
          setTimeout(() => {
            setIsUploading(false);
          }, 1000);
        }
      },
      (error) => {
        console.error(error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageURL(downloadURL); // Set the image URL to display it
        });
      }
    );
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="text-center">Upload File</h2>
          </div>
        </div>
        <input
          type="file"
          className="form-control mt-4"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        {file?.name && (
          <p className="mb-0">
            Name: {file.name} || Size: {(file.size / 1024).toFixed(2)} KB
          </p>
        )}
        {isUploading && (
          <div className="row mt-3">
            <div className="col">
              <div
                className="progress"
                role="progressbar"
                aria-label="Example with label"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row mt-4 text-end me-5">
          <div className="col">
            <button
              className="btn btn-success"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {!isUploading ? (
                "Upload"
              ) : (
                <div className="spinner-border"></div>
              )}
            </button>
          </div>
        </div>
        {imageURL && (
          <div className="row mt-4">
            <div className="col">
              <img
                src={imageURL}
                alt="Uploaded file"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadFile;

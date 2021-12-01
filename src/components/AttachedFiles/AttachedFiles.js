import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "reactstrap";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./Previews.scss";

const AttachedFiles = ({
  type,
  title,
  onAddFile,
  attachedFiles,
  onRemoveFile,
}) => {
  const [files, setFiles] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [removeFile, setRemoveFile] = useState();
  const [newFiles, setNewFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      // const newAcceptedFiles = acceptedFiles.map(function (file) {
      //   const newObj = {
      //     preview: URL.createObjectURL(file),
      //     id: file.name,
      //   };
      //   return newObj;
      // });
      // setFiles((oldFiles) => {
      //   let newArr = oldFiles.concat(newAcceptedFiles);

      //   return newArr;
      // });
      // setNewFiles((oldFiles) => {
      //   let newArr = oldFiles.concat(acceptedFiles);

      //   return newArr;
      // });

      onAddFile(acceptedFiles, "1");

      // const newAcceptedFiles = acceptedFiles.map(function (file) {
      //   const newObj = {
      //     preview: URL.createObjectURL(file),
      //     id: file.name,
      //   };
      //   return newObj;
      // });

      // setFiles((oldFiles) => {
      //   let newArr = oldFiles.concat(newAcceptedFiles);

      //   return newArr;
      // });
      // setNewFiles((oldFiles) => {
      //   let newArr = oldFiles.concat(acceptedFiles);

      //   return newArr;
      // });
    },
  });
  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };
  // const thumbs = files.map((file) => (
  //   <div className="thumb" key={file.id}>
  //     <span
  //       className="attached--remove-img"
  //       onClick={() => {
  //         setRemoveFile(file);
  //         toggleConfirmModal();
  //       }}
  //     ></span>
  //     <div className="thumbInner">
  //       <img src={file.preview} className="attached--img" alt="..." />
  //     </div>
  //   </div>
  // ));

  useEffect(() => {
    switch (type) {
      case "image":
        break;
      case "pdf":
        break;
      case "schema":
        break;
      default:
        break;
    }
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));

    setFiles([
      ...attachedFiles.map((file) => {
        return {
          name: file.img,
          preview: process.env.REACT_APP_SERVER_URL + "/" + file.img,
          id: file.id,
        };
      }),
    ]);
  }, [attachedFiles]);
  // const uploadFiles = async (newFiles, addFileFunc) => {
  //   if (newFiles.length > 0) {
  //     const arr = [...newFiles];
  //     for (let i = 0; i < arr.length; i++) {
  //       let base64Format = await toBase64(arr[i]);
  //       await addFileFunc(base64Format, "image");
  //     }
  //     setNewFiles([]);
  //   } else {
  //     console.log("Dont have files to upload");
  //   }
  // };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <ConfirmModal
        modal={confirmModal}
        toggleModal={toggleConfirmModal}
        title="Remove image"
        handleSubmit={() => {
          onRemoveFile(removeFile);
        }}
        modalText={`Are you sure you want to DELETE file`}
      />
      <div className="">
        <h2 className="page-subtitle">{title && title}</h2>
        <Button
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Upload Files
        </Button>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {/* Add {type && type} */}
          {files &&
            files.map((file) => (
              <div className="thumb" key={file.id}>
                <span
                  className="attached--remove-img"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setRemoveFile(file);
                    toggleConfirmModal();
                  }}
                ></span>
                <div className="thumbInner">
                  <img src={file.preview} className="attached--img" alt="..." />
                </div>
              </div>
            ))}
        </div>
        <div className="thumbsContainer"></div>
      </div>
    </>
  );
};
export default AttachedFiles;

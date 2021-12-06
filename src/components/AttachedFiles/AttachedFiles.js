import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "../../scss/attachedFiles.scss";

const AttachedFiles = ({
  type,
  name,
  onAddFile,
  attachedFiles,
  onRemoveFile,
  accepted = ".jpg, .jpeg, .png",
  multiple = true,
  maxFiles = 0,
}) => {
  const [files, setFiles] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [removeFile, setRemoveFile] = useState();
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: accepted,
    noClick: files.length > 0 ? true : false,
    noKeyboard: true,
    multiple: multiple,
    maxFiles: maxFiles,
    onDrop: (acceptedFiles) => {
      if (files.length < 1 || maxFiles === 0) {
        const newAcceptedFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        onAddFile(newAcceptedFiles, type);
      }
    },
  });
  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  useEffect(() => {
    console.log("render");
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));

    setFiles([
      ...attachedFiles.map((file, i) => {
        const fileExtension = file.img.substring(file.img.lastIndexOf("."));
        const imageTypes = [".jpeg", ".png", ".jpg"];
        const isImage = imageTypes.some((el) => fileExtension.includes(el));
        let preview;
        let id;
        if (file.preview) {
          preview = file.preview;
        } else {
          preview = process.env.REACT_APP_SERVER_URL + "/" + file.img;
        }
        if (file.id) {
          id = file.id;
        } else {
          id = i;
        }
        return {
          name: file.img,
          preview: preview,
          id: id,
          isImage: isImage,
        };
      }),
    ]);
  }, [attachedFiles]);

  const thumbs =
    files &&
    files.length > 0 &&
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
          {file.isImage === true ? (
            <img src={file.preview} className="attached--img" alt="..." />
          ) : (
            <i className="far fa-file  fa-4x"></i>
          )}
        </div>
      </div>
    ));

  return (
    <>
      <ConfirmModal
        modal={confirmModal}
        toggleModal={toggleConfirmModal}
        title="Remove image"
        handleSubmit={() => {
          onRemoveFile(removeFile, type);
        }}
        modalText={`Are you sure you want to DELETE file`}
      />
      <h3 className="page-subtitle fw-normal">{name && name}</h3>
      <div
        {...getRootProps({
          className:
            "dropzone " +
            (files && files.length > 0 ? "" : "dropzone--placeholder"),
        })}
      >
        {/* <Button
          className="delete-file--btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setRemoveFile("all");
            toggleConfirmModal();
          }}
        >
          Delete all {name}
        </Button>
        <Button
          className="upload-file--btn"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Upload {name}
        </Button> */}
        <input {...getInputProps()} />

        {thumbs ? (
          <div className="thumbsContainer">
            {thumbs}
            {maxFiles === 0 && (
              <div
                className="thumb"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  open();
                }}
              >
                <button className="dropzone--add-file-btn btn ">
                  <i class="fas fa-plus fa-2x add-file-btn--icon"></i>
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className="dropzone--placeholder-text">
            Drag 'n' drop some files here, or click to select files
          </span>
        )}
      </div>
    </>
  );
};
export default AttachedFiles;

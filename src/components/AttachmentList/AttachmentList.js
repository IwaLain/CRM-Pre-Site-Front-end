import React, { useEffect, useState } from "react";
import AttachedFiles from "../AttachedFiles/AttachedFiles";
import convertToBase64 from "../../js/helpers/convertImage";
const AttachmentList = ({
  attachedFiles = [{ type_id: "1", attachedFiles: [{ img: "asdasd" }] }],
  onAddFileServer = null,
  onRemoveFileServer = null,
  setCreatedFiles,
}) => {
  const [attachedImages, setAttachedImages] = useState([]);
  const [attachedSchemas, setAttachedSchemas] = useState([]);
  const [attachedDocs, setAttachedDocs] = useState([]);

  async function onAddImage(files, type) {
    let setFilesFunction;
    let newFiles;

    if (type == "1") {
      setFilesFunction = setAttachedImages;
    } else if (type == "2") {
      setFilesFunction = setAttachedSchemas;
    } else if (type == "3") {
      setFilesFunction = setAttachedDocs;
    }
    // if (onAddFileServer) {
    //   const updatedFiles = await onAddFileServer(files, type);
    //   console.log(updatedFiles);
    //   setFilesFunction(
    //     updatedFiles.map((file) => {
    //       return {
    //         img: file.img,
    //         preview: process.env.REACT_APP_SERVER_URL + "/" + file.img,
    //         type_id: file.type_id,
    //         id: file.id,
    //       };
    //     })
    //   );
    // }
    // for (let i = 0; i < files.length; i++) {
    //   const base64 = await convertToBase64(files[i]);
    //   const preview = files[i].preview;
    //   const id = files[i].id;
    //   const data = { base64, preview, id };
    //   if (onAddFileServer) {
    //     const fileData = { img: data.base64, type_id: type };
    //     const response = await onAddFileServer(id, data);
    //   }
    // }
    // else {
    Promise.all(
      files.map(async (img) => {
        return {
          preview: img.preview,
          img: img.path,
          id: `${Math.random() * 1000}`,
          base64: await convertToBase64(img),
        };
      })
    ).then(async (res) => {
      newFiles = res;
      if (onAddFileServer || setCreatedFiles) {
        const data = res.map((file) => {
          return { type_id: type, img: file.base64 };
        });
        if (onAddFileServer) {
          let responseData = await onAddFileServer(data, type);
          if (responseData && responseData.length) {
            newFiles = responseData.map((file) => {
              return {
                img: file.img,
                preview: process.env.REACT_APP_SERVER_URL + "/" + file.img,
                type_id: file.type_id,
                id: file.id,
              };
            });
          }
        }
        if (setCreatedFiles) {
          setCreatedFiles((state) => [...state, ...data]);
        }
      }
      setFilesFunction((state) => [...state, ...newFiles]);
    });
    // }
  }
  async function onRemoveImage(file, type) {
    let setFilesFunction;
    let isDeleted = true;
    if (type == "1") {
      setFilesFunction = setAttachedImages;
    } else if (type == "2") {
      setFilesFunction = setAttachedSchemas;
    } else if (type == "3") {
      setFilesFunction = setAttachedDocs;
    }
    if (onRemoveFileServer) {
      isDeleted = await onRemoveFileServer(file.id, type);
    } else {
      setCreatedFiles((state) => state.filter((el) => el.id !== file.id));
    }
    if (isDeleted) {
      setFilesFunction((state) => {
        console.log(file.id);
        const updatedFiles = state.filter((el) => el.id !== file.id);
        return updatedFiles;
      });
    }
  }

  // const urlToBase64 = (img) => {
  //   let canvas = document.createElement("canvas");
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   let ctx = canvas.getContext("2d");
  //   ctx.drawImage(img, 0, 0);
  //   let dataURL = canvas.toDataURL("image/png");

  //   return dataURL;
  // };

  useEffect(() => {
    let updatedFiles = attachedFiles.map((file) => {
      const preview = process.env.REACT_APP_SERVER_URL + "/" + file.img;
      document.querySelector("#placeholder-img").src = preview;
      return {
        img: file.img,
        preview,
        type_id: file.type_id,
        id: file.id,
      };
    });

    setAttachedImages(updatedFiles.filter((el) => el.type_id == "1"));
    setAttachedSchemas(updatedFiles.filter((el) => el.type_id == "2"));
    setAttachedDocs(updatedFiles.filter((el) => el.type_id == "3"));
  }, [attachedFiles]);
  return (
    <>
      <img
        id="placeholder-img"
        src=""
        alt="placeholder err"
        style={{ display: "none" }}
      />
      <div className="row">
        <div className="col">
          <AttachedFiles
            type="1"
            name="Images"
            accepted=".jpg, .jpeg, .png"
            onAddFile={onAddImage}
            onRemoveFile={onRemoveImage}
            attachedFiles={attachedImages}
          />
        </div>
        <div className="col">
          <AttachedFiles
            type="2"
            name="Shemas"
            accepted=".jpg, .jpeg, .png, .csv,.doc,.docx, application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onAddFile={onAddImage}
            onRemoveFile={onRemoveImage}
            attachedFiles={attachedSchemas}
          />
        </div>
        <div className="col">
          <AttachedFiles
            type="3"
            name="Docs"
            accepted=".jpg, .jpeg, .png, .csv,.doc,.docx, application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            attachedFiles={attachedDocs}
            onAddFile={onAddImage}
            onRemoveFile={onRemoveImage}
          />
        </div>
      </div>
    </>
  );
};
export default AttachmentList;

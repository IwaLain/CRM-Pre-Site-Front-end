import React, { useEffect, useState } from "react";
import AttachedFiles from "../AttachedFiles/AttachedFiles";
const AttachmentList = ({ attachedFiles, fileTypes = ["1", "2", "3"] }) => {
  const [attachedImages, setAttachedImages] = useState([]);
  const [attachedSchemas, setAttachedSchemas] = useState([]);
  const [attachedDocs, setAttachedDocs] = useState([]);
  // const [fileTypes, setFileTypes] = useState();
  // const setFiles = (files, fileType) => {
  //   const newFiles = files.filter((el) => el.type_id == fileType.type_id);

  //   fileType.attachedFiles = newFiles;
  //   return fileType;
  // };

  useEffect(() => {
    setAttachedImages((state) => [
      ...state,
      attachedFiles.filter((el) => el.type_id == "1"),
    ]);
    setAttachedSchemas((state) => [
      ...state,
      attachedFiles.filter((el) => el.type_id == "2"),
    ]);
    setAttachedDocs((state) => [
      ...state,
      attachedFiles.filter((el) => el.type_id == "3"),
    ]);
  }, [attachedFiles]);
  return (
    <>
      <div className="row">
        <AttachedFiles
          type="1"
          name="Images"
          // accepted={fileType.fileExtensions}
          attachedFiles={attachedImages}
        />{" "}
        <AttachedFiles
          type="2"
          name="Shemas"
          // accepted={fileType.fileExtensions}
          attachedFiles={attachedSchemas}
        />{" "}
        <AttachedFiles
          type="3"
          name="Docs"
          // accepted={fileType.fileExtensions}
          attachedFiles={attachedDocs}
        />
        {/* {attachedFiles &&
          fileTypes &&
          fileTypes.map((fileType) => (
            <AttachedFiles
              type={fileType}
              name={"name"}
              // accepted={fileType.fileExtensions}
              attachedFiles={
                attachedFiles.filter((el) => el.type_id == fileType)
                  ? attachedFiles.filter((el) => el.type_id == fileType)
                  : []
              }
            />
          ))} */}
      </div>
    </>
  );
};
export default AttachmentList;

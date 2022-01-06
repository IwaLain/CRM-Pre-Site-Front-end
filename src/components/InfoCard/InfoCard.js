import placeholder from "../../assets/img/company.png";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";

const InfoCard = ({
  data,
  type,
  toggleModal,
  chooseMode,
  selected,
  changeCustomer,
  dispatch,
  currentSubEntityName,
  setCurrentSubEntityName,
  hideRecordView,
}) => {
  const [toggleEntityModal, setToggleEntityModal] = useState(false);
  const [subEntity, setSubEntity] = useState("");
  const [progress, setProgress] = useState(0);
  const { setEditId } = useContext(GlobalContext);
  const [mainImage, setMainImage] = useState();
  const onSetMainImage = (images) => {
    if (images && images.length > 0) {
      let image = images.find((el) => el["main_image"] === "1");
      if (image) {
        setMainImage(image.img);
      }
    }
  };

  useEffect(() => {
    let totalProgress = 0;
    if (type) {
      switch (type) {
        case "customers":
          if (data.name) totalProgress += 33.333333;
          if (data.facilities && data.facilities.length > 0)
            totalProgress += 33.333333;
          if (data.equipments && data.equipments.length > 0)
            totalProgress += 33.333333;
          setSubEntity("Facilities");
          onSetMainImage(data["customerImages"]);

          break;
        case "facilities":
          if (data.name) totalProgress += 33.333333;
          if (data.locations && data.locations.length > 0)
            totalProgress += 33.333333;
          if (data.equipments && data.equipments.length > 0)
            totalProgress += 33.333333;
          setSubEntity("Locations");
          onSetMainImage(data["facilityImages"]);

          break;
        case "locations":
          setSubEntity("Equipment");
          onSetMainImage(data["locationImages"]);
          break;
        case "equipment":
          setSubEntity(["Sensors", "Mote"]);
          onSetMainImage(data["equipmentImages"]);
          break;
        default:
          setSubEntity("");
          break;
      }
    }

    setProgress(totalProgress);
  }, [type]);
  useEffect(() => {
    if (
      currentSubEntityName &&
      currentSubEntityName.name &&
      toggleEntityModal
    ) {
      dispatch({ mode: "edit" });
      setEditId(data.id);
      toggleModal();
      setToggleEntityModal(!toggleEntityModal);
    }
  }, [toggleEntityModal]);

  return (
    <div className="info-card">
      {chooseMode ? (
        <input
          type="checkbox"
          checked={selected}
          onChange={() => changeCustomer(data.id)}
        />
      ) : (
        <button
          className="info-card__edit ui-btn ui-btn-secondary"
          onClick={() => {
            if (setCurrentSubEntityName) {
              setToggleEntityModal(!toggleEntityModal);
              setCurrentSubEntityName((state) => ({ ...state, name: type }));
            } else {
              if (dispatch) {
                dispatch({ mode: "edit" });
              }
              if (data) {
                setEditId(data.id);
              }
              if (toggleModal) {
                toggleModal();
              }
            }
          }}
        >
          <i className="far fa-edit"></i>
        </button>
      )}
      <div className="info-card__body">
        <div>
          <img
            src={
              mainImage
                ? process.env.REACT_APP_SERVER_URL + "/" + mainImage
                : placeholder
            }
            alt="card error"
          />
        </div>
        <div className="info-card__info">
          <h4 title={data && data.name} className="info-card__name">
            {data && data.name}
          </h4>
          <div style={!subEntity ? { visibility: "hidden" } : {}}>
            {type !== "equipment"
              ? subEntity &&
                `${subEntity}: ${data[subEntity.toLowerCase()].length}`
              : subEntity &&
                `${subEntity[0]}/${subEntity[1]}: ${
                  data[subEntity[0].toLowerCase()].length +
                  data[subEntity[1].toLowerCase()].length
                }`}
            {!subEntity && "No data."}
          </div>
          <div
            className={
              chooseMode
                ? "info-card__btns"
                : "info-card__btns info-card__btns-one"
            }
          >
            <Link
              className="ui-btn ui-btn-info"
              to={`/${type}/${data && data.id}`}
              style={data && hideRecordView ? { visibility: "hidden" } : {}}
            >
              View
            </Link>
            {chooseMode && (
              <button
                className="ui-btn ui-btn-secondary"
                onClick={() => {
                  if (setCurrentSubEntityName) {
                    setToggleEntityModal(!toggleEntityModal);
                    setCurrentSubEntityName({ name: type });
                  } else {
                    if (dispatch) {
                      dispatch({ mode: "edit" });
                    }
                    if (data) {
                      setEditId(data.id);
                    }
                    if (toggleModal) {
                      toggleModal();
                    }
                  }
                }}
              >
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {progress ? <Progress value={progress} /> : null}
    </div>
  );
};

export default InfoCard;

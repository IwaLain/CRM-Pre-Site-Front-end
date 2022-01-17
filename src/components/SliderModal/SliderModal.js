import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Carousel,
  CarouselIndicators,
  CarouselItem,
  CarouselControl,
} from "reactstrap";
import "./slider-modal.scss";

const SliderModal = ({
  modal,
  toggleModal,

  title,

  entityImages,
}) => {
  const [animating, setAnimating] = useState(false);
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (modal) {
      setActiveIndex(0);
      const imageArr = entityImages;
      if (imageArr && Array.isArray(imageArr)) {
        setItems(
          imageArr
            .filter((el) => el.type_id === "1")
            .map((item, i) => {
              return {
                altText: `Slide ${i + 1}`,

                key: i + 1,
                src: process.env.REACT_APP_SERVER_URL + "/" + item.img,
              };
            })
        );
      } else if (imageArr) {
        setItems([
          {
            altText: `Slide 1`,

            key: 1,
            src: imageArr.src,
          },
        ]);
      }
    }
  }, [modal]);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem key={item.src} onExiting={onExiting} onExited={onExited}>
        <img src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });

  return (
    <>
      <Modal isOpen={modal} toggle={toggleModal} className="slider-modal">
        <ModalHeader>
          {"Images"}
          <button class="modal-close" onClick={toggleModal}>
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </ModalHeader>
        <ModalBody>
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={false}
          >
            {slides}
            {
              <div className={items.length > 1 ? "" : "hidden"}>
                <div
                  className="carousel-control-prev--custom"
                  role="button"
                  tabindex="0"
                  style={{ cursor: "pointer" }}
                  onClick={previous}
                >
                  <i class="fas fa-chevron-left"></i>
                  <span class="visually-hidden">Previous</span>
                </div>
                <div
                  className="carousel-control-next--custom"
                  role="button"
                  tabindex="0"
                  style={{ cursor: "pointer" }}
                  onClick={next}
                >
                  <i class="fas fa-chevron-right"></i>
                  <span class="visually-hidden">Previous</span>
                </div>
              </div>
            }
          </Carousel>
          <CarouselIndicators
            className={items.length > 1 ? "" : "hidden"}
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
export default SliderModal;

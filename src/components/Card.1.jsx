import React, { useState } from "react";
import Modal from "./Modal.jsx";
import ProgressiveImg from "./progressiveImg.jsx";

export const Card = ({ item, listMode }) => {
  const [modal, setModal] = useState(false);

  const BlurredUpImage = () => {
    const [src, { blur }] = ProgressiveImg(`https://covers.openlibrary.org/b/id/${item.cover_i}-S.jpg`,
      `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`);
    return (
      <img
        src={src}
        style={{
          width: 200,
          filter: blur ? "blur(3px)" : "none",
          transition: blur ? "none" : "filter 0.3s ease-out"
        }} />
    );
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className={`card card__${listMode}-list`}>
        {item.cover_i ?
          <button className="card__img-button" onClick={() => { toggleModal(item.cover_i); }}>
            <img src={`https://covers.openlibrary.org/b/id/${item.cover_i}-S.jpg`} />
          </button>
          :
          <img src={`https://res.cloudinary.com/tursynbekoff/image/upload/w_50/v1662125174/no-image-1024x1024.png`} />}
        <h3 className="title">
          {item.title_suggest}
        </h3>
        {<p className="author">
          {(typeof item.author_name === "object") ?
            item.author_name[0] :
            "no author"}
        </p>}
        <p className="publish-year">{item.first_publish_year}</p>
        {<p className="isbn">
          {(typeof item.isbn === "object") ?
            item.isbn[0]
            :
            "no ISBN"}
        </p>}
      </div>
      {modal ? (
        <Modal>
          <div className="img-wrapper">
            <BlurredUpImage />
          </div>
          <button onClick={toggleModal}>close</button>
        </Modal>
      ) : null}
    </>
  );
};

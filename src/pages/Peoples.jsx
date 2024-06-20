import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainWindow from "../MainWindow";
import "./CSS/WatchNow.css";
import settings from '../components/SliderForMany';
import TopMenu from "../TopMenu";
import Slider from "react-slick";
import {
  fetchPersonById,
  selectPersonById,
  selectPersonImagesById,
  fetchPersonImagesById,
} from "../components/slices/MoviesSlicer";

export default function Peoples() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const personId = location.state?.personId || id;
  const personById = useSelector(selectPersonById);
  const personImagesById = useSelector(selectPersonImagesById);
  const error = useSelector((state) => state.movies.error);
  console.log(personImagesById, personImagesById?.[0]?.file_path, 666321);
  useEffect(() => {
    console.log("Fetching person with ID:", personId);
    if (personId) {
      console.log("Dispatching fetchPersonById and fetchPersonImagesById");
      dispatch(fetchPersonById(personId));
      dispatch(fetchPersonImagesById(personId));
    }
  }, [personId, dispatch]);
  return (
    <div className="main-wrapper">
      <div className="menu-windows">
        <div className="menu-window">
          <MainWindow />
        </div>
        <div className="main-div">
          <TopMenu />
          <div className="watch-now">
            <div className="person-info">
              {error ? (
                <p>{error}</p>
              ) : personById ? (
                <>
                  <div className="top-show">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${personById.profile_path}`}
                    alt={personById.name}
                  />
                  <div className="information">
                    <div className="info-block">
                      <p className="details">Name:</p>
                      <h2 className="h2">{personById.name}</h2>
                    </div>
                    <div className="info-block">
                      <p className="details">Birthday:</p>
                      <h2 className="h2">{personById.birthday}</h2>
                    </div>
                    <div className="info-block">
                      <p className="details">Place of Birth:</p>
                      <h2 className="h2">{personById.place_of_birth}</h2>
                    </div>
                    <div className="info-block">
                      <p className="details">Biography:</p>
                      <p className="h3">{personById.biography}</p>
                    </div>
                </div>
                  </div>
            <div className="images-box">
              <div className="person-images">
              <Slider {...settings}>
                {personImagesById?.map((img) => (
                 <div className="mov-img">
                   <img className='img'
                    src={"https://image.tmdb.org/t/p/w200" + img?.file_path}
                  />
                 </div>
                ))}
                </Slider>
              </div>
            </div>
                </>
              ) : (
                <p>Loading person information...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

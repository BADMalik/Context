import "./App.css";
import { useState, useContext } from "react";
import HorizontalLabelPositionBelowStepper from "./stepper";
import React from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./UserContextProvider";

function App() {
  let [currentPage, setCurrentPage] = useState(0);
  let [previousPage, setPreviousPage] = useState(null);
  let [nextButton, setNextButton] = useState(false);
  let [comingFromPreviousPage, setComingFromPreviousPage] = useState(false);
  let [previousButton, setPreviousButton] = useState(false);

  const [userDetails, setUserDetails] = useContext(UserContext);
  console.log(currentPage, "CP");
  const PageSwitchesCase = (param) => {
    switch (param) {
      case 0:
        return (
          <div>
            <FormOne
              currentPage={currentPage}
              nextButton={nextButton}
              setNextButton={setNextButton}
              setCurrentPage={setCurrentPage}
              previousPage={previousPage}
              previousButton={previousButton}
              setPreviousButton={setPreviousButton}
              setPreviousPage={setPreviousPage}
              comingFromPreviousPage={comingFromPreviousPage}
              setComingFromPreviousPage={setComingFromPreviousPage}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <FormTwo
              currentPage={currentPage}
              nextButton={nextButton}
              setNextButton={setNextButton}
              setCurrentPage={setCurrentPage}
              previousPage={previousPage}
              previousButton={previousButton}
              setPreviousButton={setPreviousButton}
              setPreviousPage={setPreviousPage}
              comingFromPreviousPage={comingFromPreviousPage}
              setComingFromPreviousPage={setComingFromPreviousPage}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <FormThree
              currentPage={currentPage}
              nextButton={nextButton}
              setNextButton={setNextButton}
              setCurrentPage={setCurrentPage}
              previousPage={previousPage}
              previousButton={previousButton}
              setPreviousButton={setPreviousButton}
              setPreviousPage={setPreviousPage}
              comingFromPreviousPage={comingFromPreviousPage}
              setComingFromPreviousPage={setComingFromPreviousPage}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <div>First Name : {userDetails.firstName}</div>
            <div>Last Name : {userDetails.lastName}</div>
            <div>Location : {userDetails.location}</div>
            <div>Education : </div>
            <pre>
              {userDetails.education.map((data) => {
                return (
                  <div>
                    <div>Country : {data.country}</div>
                    <div>City : {data.city}</div>
                    <div>School : {data.school}</div>
                    <div>From : {data.from}</div>
                    <div>To : {data.to}</div>
                  </div>
                );
              })}
            </pre>
          </div>
        );
      default:
        return <div>asdw</div>;
    }
  };
  return (
    <div>
      <div style={{ marginTop: "2rem" }}>
        <HorizontalLabelPositionBelowStepper currentPage={currentPage} />
      </div>
      <div>
        {currentPage === 0 && (
          <div className="container">{PageSwitchesCase(currentPage)}</div>
        )}
        {currentPage === 1 && (
          <div className="container">{PageSwitchesCase(currentPage)}</div>
        )}
        {currentPage === 2 && <div>{PageSwitchesCase(currentPage)}</div>}
        {currentPage === 3 && <div>{PageSwitchesCase(currentPage)}</div>}
      </div>
    </div>
  );
}

export default App;

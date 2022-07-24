import { useContext, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { CSSTransition } from "react-transition-group";
import "./animation.css";
import { UserContext } from "./UserContextProvider";
import { useForm } from "react-hook-form";
import "./tableCss.scss";

const FormThree = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let {
    currentPage,
    setCurrentPage,
    setNextButton,
    comingFromPreviousPage,
    setComingFromPreviousPage,
  } = props;
  const [showMessage, setShowMessage] = useState(false);
  const [userDetails, setUserDetails] = useContext(UserContext);

  useEffect(() => {
    if (currentPage === 2) {
      setShowMessage(true);
      setNextButton(true);
    }
  }, []);

  const onSubmit = (data) => {
    // if (userDetails.education.length === 0) {
    //   setUserDetails((prev) => ({
    //     ...prev,
    //     education: [...data],
    //   }));
    // } else {
    setUserDetails((prev) => ({
      ...prev,
      education: [...prev.education, data],
    }));
  };

  const deleteEd = (id) => {
    setUserDetails((prev) => ({
      ...prev,
      education: prev.education.filter(
        (e, i) => prev.education.indexOf(e) !== id
      ),
    }));
  };

  return (
    <CSSTransition
      in={showMessage}
      timeout={2000}
      classNames={comingFromPreviousPage ? "previous" : "example"}
      unmountOnExit
    >
      <div style={{ margin: "0 auto" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ margin: "0 auto", width: "40%" }}
        >
          <div className="form">
            <div className="my-1">
              <label className="sr-only">School Name</label>
              <input
                type="text"
                {...register("school", { required: "School name is required" })}
                className="form-control"
                placeholder="School Name"
              />
            </div>
            {errors.school && <div>{errors.school.message}</div>}
            <div className="my-1">
              <label className="sr-only">City Name</label>
              <input
                {...register("city", { required: "City name is required" })}
                type="text"
                className="form-control"
                placeholder="City Name"
              />
            </div>
            {errors.city && <div>{errors.city.message}</div>}
            <div className="my-1">
              <label className="sr-only">Country Name</label>
              <input
                type="text"
                {...register("country", {
                  required: "country name is required",
                })}
                className="form-control"
                placeholder="Country Name"
              />
            </div>
            {errors.country && <div>{errors.country.message}</div>}
            <div className="my-1">
              <label className="sr-only">From</label>
              <input
                {...register("from", { required: "Start Date is required" })}
                type="date"
                className="form-control"
                placeholder="From"
              />
            </div>
            {errors.from && <div>{errors.from.message}</div>}
            <div className="my-1">
              <label className="sr-only">To</label>
              <div className="input-group">
                <input
                  {...register("to", { required: "Ending Date is required" })}
                  type="date"
                  className="form-control"
                  placeholder="To"
                />
              </div>
            </div>
            {errors.to && <div>{errors.to.message}</div>}
            {Object.keys(errors).length === 0 && (
              <div className="col-automy-1">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            )}
            <div>
              <button
                type="click"
                onClick={() => {
                  setComingFromPreviousPage(true);
                  setShowMessage(false);
                  setCurrentPage(currentPage - 1);
                }}
                className="mt-2 btn btn-primary"
              >
                Proceed to Previous Page {currentPage}
              </button>
            </div>
          </div>
        </form>
        <table className="spacing">
          <thead>
            <tr>
              <th>School</th>
              <th>Country</th>
              <th>City</th>
              <th>From</th>
              <th>To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userDetails.education &&
              Object.keys(userDetails.education).length > 0 &&
              userDetails.education.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.school}</td>
                    <td>{item.country}</td>
                    <td>{item.city}</td>
                    <td>{item.from}</td>
                    <td>{item.to}</td>
                    <td>
                      <button onClick={() => deleteEd(index)}>❌</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>
          {userDetails.education &&
            Object.keys(userDetails.education).length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  Submit all the data
                </button>
              </div>
            )}
        </div>
      </div>
    </CSSTransition>
  );
};

export default FormThree;

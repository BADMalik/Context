import { useState, useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./animation.css";
import { UserContext } from "./UserContextProvider";
import { useForm } from "react-hook-form";
const FormOne = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [userDetails, setUserDetails] = useContext(UserContext);
  const { currentPage, setPreviousPage, setPreviousButton } = props;
  const [firstName, setFirstName] = useState(
    userDetails.firstName === "" ? "" : userDetails.firstName
  );
  const [lastName, setLastName] = useState(
    userDetails.lastName === "" ? "" : userDetails.lastName
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentPage === 0) {
      setPreviousPage(null);
      setPreviousButton(false);
      setShowMessage(true);
    }
  }, []);

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      setShowMessage(false);
      setTimeout(() => {
        setPreviousButton(true);
        setPreviousPage(currentPage);
        props.setCurrentPage(currentPage + 1);
        setUserDetails((prev) => ({ ...prev, ...data }));
        props.setComingFromPreviousPage(false);
      }, 500);
    }
  };
  return (
    <div>
      <CSSTransition
        in={showMessage}
        timeout={1000}
        classNames={props.comingFromPreviousPage ? "previous" : "example"}
        unmountOnExit
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              {...register("firstName", { required: "First Name is required" })}
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter First Name"
              value={firstName || ""}
              onChange={(e) => {
                setFirstName(e.target.value);
                setValue("firstName", e.target.value, { shouldValidate: true });
              }}
            />
            {errors.firstName && <div>{errors.firstName.message}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter Last Name"
              value={lastName || ""}
              onChange={(e) => {
                setLastName(e.target.value);
                setValue("lastName", e.target.value, { shouldValidate: true });
              }}
            />
            {errors.lastName && <div>{errors.lastName.message}</div>}
          </div>
          <div>
            {Object.keys(errors).length === 0 && (
              <div>
                <button type="submit" className="mt-2 btn btn-primary">
                  Proceed to Page {currentPage + 2}
                </button>
              </div>
            )}
          </div>
        </form>
      </CSSTransition>
    </div>
  );
};

export default FormOne;

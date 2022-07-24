import { useState, useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./animation.css";
import { UserContext } from "./UserContextProvider";
import { useForm } from "react-hook-form";
import axios from "axios";

const FormTwo = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [searchCountries, setSearchCountries] = useState(false);
  const [suggestions, setSuggestions] = useState(false);

  const [userDetails, setUserDetails] = useContext(UserContext);
  const [location, setLocation] = useState(userDetails.location || "");
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  let {
    currentPage,
    setPreviousPage,
    setPreviousButton,
    setCurrentPage,
    setNextButton,
    setComingFromPreviousPage,
    comingFromPreviousPage,
  } = props;

  const getCountries = async (e) => {
    setNextButton(false);
    await axios
      .get("https://restcountries.com/v3.1/name/" + e)
      .then(function (response) {
        setSuggestions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentPage === 1) {
      setShowMessage(true);
      setNextButton(true);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchCountries && location) {
        getCountries(location);
      }
    }, 1000);
    return () => clearTimeout(debounce);
  }, [location]);

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      setShowMessage(false);
      setUserDetails((previousValues) => ({ ...previousValues, ...data }));
      setTimeout(() => {
        setPreviousButton(true);
        setPreviousPage(currentPage);
        setCurrentPage(currentPage + 1);
        setNextButton(true);
        setComingFromPreviousPage(false);
      }, 500);
    }
  };

  const setLocationFromDD = (e) => {
    setValue("location", e);
    setLocation(e);
    setSearchCountries(false);
    setSuggestions([]);
    clearErrors();
  };
  console.log(userDetails);
  console.log(comingFromPreviousPage, "CFPPaawaw");
  return (
    <div>
      <CSSTransition
        in={showMessage}
        timeout={1000}
        classNames={comingFromPreviousPage ? "previous" : "example"}
        unmountOnExit
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="location">Location Name</label>
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              className="form-control"
              id="location"
              placeholder="Enter Location"
              value={location || ""}
              onChange={(e) => {
                setLocation(e.target.value);
                setSearchCountries(true);
              }}
            />
            {errors.location && !suggestions.length > 0 && (
              <div>{errors.location.message}</div>
            )}
          </div>
          {suggestions && suggestions.length > 0 && (
            <div>
              {suggestions.map((suggestion) => {
                return (
                  <div
                    onClick={() => {
                      setLocationFromDD(suggestion.name.common);
                    }}
                    key={suggestion.name.common}
                  >
                    {suggestion.name.common}
                  </div>
                );
              })}
            </div>
          )}

          <div>
            {Object.keys(errors).length === 0 && (
              <div>
                <button type="submit" className="mt-2 btn btn-primary">
                  Proceed to Page {currentPage + 2}
                </button>
              </div>
            )}
          </div>
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
        </form>
      </CSSTransition>
    </div>
  );
};

export default FormTwo;

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gender, setGender] = useState(null);
  const [nat, setNat] = useState("");
  const [results, setResults] = useState([]);
  const [limit, setLimit] = useState(1);
  const [loading, setLoading] = useState(false);

  const onChangeNat = (e) => setNat(e.target.value);
  const onChangeLimit = (e) => setLimit(e.target.value);

  const getRandom = () => {
    setLoading(true);

    // Results in empty string if gender and nationality are unspecified
    let gender_ = gender ? `gender=${gender}` : "";
    let nat_ = nat !== "" ? `nat=${nat}` : "";
    let results_ = limit > 1 ? `results=${limit}` : "";

    fetch(`https://randomuser.me/api/?${results_}&${gender_}&${nat_}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      });
  };

  const genderOptions = [
    {
      value: null,
      label: "All",
    },
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  useEffect(() => {
    getRandom();
  }, [gender]);

  return (
    <div className="p-4">
      <div className="between">
        <div>
          <button
            onClick={() => getRandom()}
            className="btn btn-sm shuffle-btn me-1">
            {!loading ? (
              <i className="bi bi-shuffle"></i>
            ) : (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </button>
          <div className="btn-group btn-group-sm">
            <div className="dropdown me-1">
              <a
                className="btn btn-sm dropdown-toggle text-capitalize"
                data-bs-target="#gender"
                data-bs-toggle="dropdown">
                <i className="me-2 bi bi-gender-ambiguous"></i>
                {!gender ? "All Genders" : gender}
              </a>
              <div className="dropdown-menu text-center" id="gender">
                {genderOptions.map((x) => (
                  <>
                    {x.value !== gender && (
                      <a
                        className="dropdown-item small"
                        onClick={() => setGender(x.value)}>
                        {x.label}
                      </a>
                    )}
                  </>
                ))}
              </div>
            </div>
            <form
              className="input-group ms-1"
              onSubmit={(e) => {
                e.preventDefault();
                getRandom();
              }}>
              <span className="small p-1">Number Of Users:</span>
              <input
                type="number"
                min={1}
                className="form-control form-control-sm"
                autoComplete="off"
                value={limit}
                onChange={onChangeLimit}
              />

              <input
                placeholder="Nationality"
                type="text"
                className="form-control form-control-sm"
                autoComplete="off"
                value={nat}
                onChange={onChangeNat}
              />
              <button type="submit" className="d-none"></button>
            </form>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        {results.map((x) => (
          <div className="col-xl-4 p-3">
            <div
              className="p-4"
              style={{ border: "1px solid", borderRadius: "5px" }}>
              <div className="row">
                <div className="col-3 d-flex">
                  <img className="rounded" src={x.picture.medium} />
                </div>
                <div className="col-9">
                  <div className="between">
                    <div>
                      <i className="bi bi-person-fill me-2"></i>
                      {x.name.first} {x.name.last}
                    </div>
                    <div className="text-capitalize">
                      <i className="bi bi-gender-ambiguous me-2"></i> {x.gender}
                    </div>
                  </div>
                  <div className="fst-italic">
                    <i className="bi bi-envelope-fill me-2"></i>
                    {x.email}
                  </div>
                  <div>
                    <i className="bi bi-balloon me-2"></i>
                    {new Date(x.dob.date).toDateString()}
                  </div>
                  <div>
                    <i className="bi bi-globe me-2"></i> {x.nat}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

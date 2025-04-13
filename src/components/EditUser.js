import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [judul, setJudul] = useState("");
  const [isi_catatan, setIsiCatatan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://be-954509048139.us-central1.run.app/notes/${id}`, {
        judul,
        isi_catatan,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`https://be-954509048139.us-central1.run.app/notes/${id}`);
    setJudul(response.data.judul);
    setIsiCatatan(response.data.isi_catatan);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Judul</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Judul"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Isi Catatan</label>
            <div className="control">
              <textarea
                className="input"
                value={isi_catatan}
                onChange={(e) => setIsiCatatan(e.target.value)}
                placeholder="Isi Catatan"
                style={{ height: "150px" }}
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

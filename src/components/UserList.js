import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await axios.get("http://localhost:4000/notes");
    setNotes(response.data);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${id}`);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "50px", marginLeft: "100px" }}>
        <Link to={`add`} className="button is-success">Add New</Link>

        <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
          {notes.map((note, index) => (
            <div key={note.id} style={{ width: "400px" }}>
              <div
                style={{
                  backgroundColor: "wheat",
                  width: "100%",
                  height: "300px",
                  marginTop: "30px",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "wheat",
                    width: "100%",
                    height: "50px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingRight: "20px",
                      paddingLeft: "20px",
                    }}
                  >
                    <h1 style={{ marginTop: "10px", color: "black" }}>
                      {note.judul}
                    </h1>
                    <h1 style={{ marginTop: "10px", color: "black" }}>
                      {note.tanggal_diubah}
                    </h1>
                  </div>
                </div>
                <div
                  style={{
                    width: "380px",
                    backgroundColor: "grey",
                    height: "1px",
                    marginLeft: "10px",
                  }}
                ></div>
                <div style={{ height: "200px" }}>
                  <div style={{ width: "100%", height: "100%", padding: "20px" }}>
                    <h1 style={{ color: "black" }}>{note.isi_catatan}</h1>
                  </div>
                  <div
                    style={{
                      width: "380px",
                      backgroundColor: "grey",
                      height: "1px",
                      marginLeft: "10px",
                    }}
                  ></div>
                  <div
                    style={{
                      height: "50px",
                      width: "100%",
                      backgroundColor: "wheat",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div></div>
                    <div>
                      <Link
                        to={`edit/${note.id}`}
                        className="button is-small is-info mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="button is-small is-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;

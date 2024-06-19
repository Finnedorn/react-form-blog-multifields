import CardComponent from "../Card/CardComponent";

import { useState, useEffect } from "react";

const MainComponent = () => {

  const [posts, setPosts] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    published: false,
    tags: [],
  });
  const tags = ["html", "css", "js", "php"];
  const [published, setPublished] = useState(false);
  const [changingBg, setChangingBg] = useState("grey");


  // changing background color //
  
  useEffect(() => {
    const changingEffect = setInterval(() => {
      setChangingBg(changingBg === "grey" ? "black" : "grey");
    }, 5000);
    return () => clearInterval(changingEffect);
  },[]); //passo un array vuoto così da attivare useEffect solo una volta al mounting della page

  useEffect(() => {
    const changingEffect = setInterval(() => {
      setChangingBg(changingBg === "grey" ? "black" : "grey");
    }, 5000);
    return () => clearInterval(changingEffect);
  },[changingBg]); //al cambiamento di changingBg (del primo useEffect) attivo il secondo useEffect 

  // post submit //

  // gestisco il cambiamento di published
  useEffect(() => {
    // setto published a true o false in base al checkmark
    setPostData({ ...postData, published: published });
    // ma se è published avvio un alert di notifica abilitiazione
    if (published) {
      alert("Post abilitato per la pubblicazione");
    }
    // cliccando sulla checkbox altero published attivando l'useEffect
  }, [published]);


  
  const postSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...postData,
      id: posts.length + 1,
    };
    setPosts([...posts, newPost]);
    setPostData({
      title: "",
      content: "",
      imageUrl: "",
      published: false,
      tags: [],
    });
    setPublished(false);
  };

  const postDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
    alert ("Post eliminato con successo!");
  };

  const postEdit = (id, newTitle, newContent) => {
    console.log(id, newTitle, newContent);
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            title: newTitle,
            content: newContent,
          };
        } else {
          return post;
        }
      });
    })
  };
  
  return (
    <main
      className="container-fluid main"
      style={{
        backgroundColor: changingBg,
        padding: "20px",
        transition: "background-color 2s ease-in-out",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          padding: "10px 0px",
          fontSize: "2.5rem",
          color: "white",
        }}
      >
        Il mio Blog
      </h1>
      {/* cards */}
      <div className="container d-flex flex-wrap justify-content-center align-items-center">
        { posts.length > 0 ?
          posts.map((post) => (
            <CardComponent
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            image={post.imageUrl}
            published={post.published}
            tags={post.tags}
            cardDelete={() => postDelete(post.id)}
            cardEdit={postEdit}
            />
          ))
          :
          <p className="p-5 fs-4 text-center text-light">
            Non ci sono post
          </p>
        }
      </div>
      {/* form */}
      <div className="container py-4">
        <h2 className="text-center text-light mb-4">
          Crea un nuovo Post
        </h2>
        <div className="d-flex justify-content-center">
          <form onSubmit={postSubmit} className="createCard p-5">
              <div>
                <h4 className="mt-3">
                  Titolo
                </h4>
                <input
                className="form-control"
                type="text"
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
              </div>
              <div>
                <h4 className="mt-3">
                  Descrizione
                </h4>
                <textarea
                className="form-control"
                type="text"
                rows="5"
                cols="50"
                value={postData.content}
                onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                />
              </div>
              <div>
                <h4 className="mt-3">
                  Immagine
                </h4>
                <input
                className="form-control"
                type="text"
                value={postData.imageUrl}
                onChange={(e) => setPostData({ ...postData, imageUrl: e.target.value })}
                />
              </div>
              <div className="mb-3">
                  <h4>Stato</h4>
                  <div className="form-check">
                    <label class="form-check-label">
                      non pubblico
                      <input
                        class="form-check-input"
                        type="radio"
                        id="not-published"
                        name="not-published"
                        onChange={() => setPublished(false)}
                        checked={!published}
                      />
                    </label>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label">
                      pubblico
                      <input
                        class="form-check-input"
                        type="radio"
                        id="published"
                        name="published"
                        onChange={() => setPublished(true)}
                        checked={published}
                      />
                    </label>
                  </div>
              </div>
              {/* tags */}
            <div>
              <h4 className="mt-3">
                Seleziona un tag
                </h4>
              {/* <div className="d-flex">
                {tags.map((tag) => (
                  <div key={tag} className="px-2">
                    <label className="pe-1" htmlFor={tag}>{tag}</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={tag}
                    value={tag}
                    onChange={() => setPostData({ ...postData, tags: [...postData.tags, tag] })}
                  />
                  </div>
                ))}
              </div> */}
              {tags.map((tag, index) => (
                <label>
                  {tag}
                  <input 
                  type="checkbox"
                  checked={postData.tags.includes(tag)}
                  onChange={() => {
                    const updatedTags = postData.tags.includes(tag)
                      ? postData.tags.filter(t => t !== tag) 
                      : [...postData.tags, tag];
            
                    setPostData(prevData => ({
                      ...prevData,
                      tags: updatedTags
                    }));
                  }}
                  />
                </label>
              ))}
            </div>
            <button
            type="submit"
            className="btn btn-primary mt-3 fs-5 fw-bold"
            >
              Crea Post
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default MainComponent;



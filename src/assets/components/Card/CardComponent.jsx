import c from "./Card.module.css";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useState } from "react";

const CardComponent = ({id, title, image, content, tags, cardDelete, cardEdit}) => {
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);
    // const [newTags, setNewTags] = useState(tags);
    
    const editMode = () => {
        // prima di attivare la edit mode faccio si che i campi 
        // di input abbiano già i valori attuali di title e content
        setNewTitle(title);
        setNewContent(content);
        // attivo la editmode
        setEdit(true);
    };

    const saveCard = () => {
        // con la funzione cardEdit passo l'id, il nuovo title e il nuovo content
        // al genitore così da poter poi gestire lato genitore la funzione di update

        // perchè passo l'id quando l'id non è un dato che ho specificato nella componente?
        // perchè l'id viene geenrato nella componente genitore al momento della creazione di una card 
        // da quel momento in poi io posso passarmelo dal genitore al figlio e viceversa!
        cardEdit (id, newTitle, newContent);
        setEdit(false);
    };

  return (
    <div className={c.cardWrapper}>
        <div className={c.card}>
            <div className={c.cardImg}>
                {
                image ? 
                <img src={image} alt={`immagine di ${title}`}/>
                 : 
                <img src="https://placehold.co/600x400" alt={`immagine di ${title}`}/>
                }
            </div>
            <div className={c.cardBody}>
                {/* se edit è true allora mostro i campi di input e nascondo i dati della card */}
                {edit ? (
                    // campi di input
                    <div className="d-flex flex-column align-items-start">
                        <input
                            className="form-control mb-3"
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <textarea
                            className="form-control mb-5"
                            type="text"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                        <div className="d-flex">
                            <button className="btn btn-success me-2" onClick={saveCard}>
                                Salva
                            </button>
                            <button className="btn btn-danger me-2" onClick={() => setEdit(false)}>
                                Indietro
                            </button>
                        </div>
                    </div>
                ) : (
                    // dati della card
                    <div>
                        <h2 className={c.cardTitle}>
                            {title}
                        </h2>
                        <p style={{
                            fontSize: "1.3rem",
                            padding: "10px 0px"
                        }}>
                            {content}
                        </p>
                        <div>
                            {tags.map((tag, index) => (
                                <span key={index} className={`tag ${tag} badge fs-5 me-2 text-light`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="pt-3">
                            <button className="btn btn-success me-2" onClick={editMode}>
                                <MdModeEditOutline/>
                            </button>
                            {/* card delete in questo caso fa da prop per la funzione che passerò dal genitore */}
                            <button className="btn btn-danger me-2" onClick={cardDelete}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default CardComponent;
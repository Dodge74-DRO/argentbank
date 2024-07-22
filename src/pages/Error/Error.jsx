import React from "react";
import { Link } from "react-router-dom";
import './error.scss';

/* Error page if user uses unknown route */
function Error() {
    return (
        <div className="error-page">
            <main>
                <section className="error">
                    <h2 className="text404">Error 404</h2>
                    <p className="text-error">Oups 🙈 la page que vous demandez n'existe pas..</p>
                    < Link to="/">
                        <button className="button-404">Retourner sur la page d'accueil</button>
                    </Link>
                </section>
            </main>
        </div>
    )
}

export default Error
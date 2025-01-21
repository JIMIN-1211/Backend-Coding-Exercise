import { Fragment } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx"

function App(){
    return(
        <div>
            <Header />
            <div className="note">
                <h1>This is the note title</h1>
                <p>This is the note content</p>
            </div>
            <Footer />
        </div>
    )
}

export default App;
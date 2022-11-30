import NavBar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./index.css";

function Default(props){
    return (
        <>
            <NavBar />

            <section>{props.children}</section>

            <Footer />
        </>
    )
}

export default Default
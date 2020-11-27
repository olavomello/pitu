import React from "react";
import { Logo, HeaderContainer  } from "./styles";
import Icone from "../../assets/icone.png";

function Header(props){
    return(
        <>
            <HeaderContainer>
                <a href="/"><Logo src={Icone} alt="Pitu - Encurtador de URL"/></a>
                <h1>URL Minify</h1>
                <p>{props.children}</p>
            </HeaderContainer>
        </>
    );
}

export default Header;
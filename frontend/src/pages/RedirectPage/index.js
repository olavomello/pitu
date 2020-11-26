import React from "react";
import Header from "../../components/Header";
import { Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShortenerService from "../../services/shortenerService";

class RedirectPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading : false,
            url : "",
            errorMessage : ""
        };

    }

    async componentDidMount(){
        const { code } = this.props.match.params;
        try{
            const service = new ShortenerService();
            const { url } = await service.getLink(code);
            
            // Redir
            window.location = url;

        } catch( error ) {
            this.setState({
                isLoading:false,
                errorMessage: "Ops, a URL solicitada não existe !"
            });
        }
    }

    render(){
        const URL = "http://localhost:3000/";
        const { errorMessage } = this.state;
        return (
            <Container>
                <Header>Redirecionando...</Header>
                <div className="text-center">
                {
                    errorMessage ? (
                        <>
                            <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle"/>
                            <p className="mt-2 mp-2">{errorMessage}</p>
                            <a href="/" className="btn btn-primary">Voltar</a>
                        </>
                    ) : (
                        <>
                            <p><Spinner animation="border" className="mr-4"/> Por favor aguarde...</p>                   
                        </>
                    )
                }
                </div>                
            </Container>
        );
    }
}
export default RedirectPage;
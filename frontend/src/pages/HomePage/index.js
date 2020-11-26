import React from "react";
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import { ContentContainer, Form, Ads } from "./styles";
import ShortenerService from "../../services/shortenerService";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading : false,
            url : "",
            code : "",
            errorMessage : ""
        };
    }

    // submit
    handleSubmit = async (event) => {
        event.preventDefault();

        // Validar URL
        const { url } = this.state;

        this.setState({
            isLoading : true,
            errorMessage : ""
        });
        
        if( !url ){
            this.setState({
                isLoading : false,
                errorMessage : "Informe uma URL válida !"
            });
            return false;
        }

         // Requsição
         try{
            const service = new ShortenerService();
            const result = await service.generate({ url });

            this.setState({
                isLoading : false,
                errorMessage : "",
                code : result.code
            });
         } catch( error ){
            this.setState({
                isLoading : false,
                errorMessage : "Ops... ocorreu um erro ao encurtar a URL.",
                code : ""
            });
         }
    }

    copyToClipBoard = () => {
        const element = this.inputURL;
        element.select();
        document.execCommand("copy");
    }

    render(){

        const URL = "http://localhost:3000/";
        const { isLoading, errorMessage, code } = this.state;

        return (
            <Container>
                <Header>Seu novo encurtador de URL.</Header>
                <ContentContainer>
                    <Form onSubmit={ this.handleSubmit }>
                        <InputGroup>
                            <FormControl
                                placeholder="Digite a URL para encurtar"
                                defaultValue=""
                                onChange={ e => this.setState({ url : e.target.value })}
                            />    
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>                    
                        </InputGroup>
                        {
                            isLoading ? (
                                // Carregando
                                <Spinner animation="border" className="mt-4"/>
                            ) : (
                                // Não carregando
                                code  && (
                                    <>
                                        <Alert variant="success" className="mt-2 mb-2">URL encurtada criada com sucesso !</Alert>
                                        <InputGroup className="mt-4">
                                            <FormControl
                                                autoFocus={true}
                                                placeholder="Digite a URL para encurtar"
                                                defaultValue={`${URL}${code}`}
                                                ref={(input) => this.inputURL = input}
                                                readOnly={true}
                                            />    
                                            <InputGroup.Append>
                                                <Button variant="secondary" onClick={()=>this.copyToClipBoard()}>Copiar</Button>
                                            </InputGroup.Append>                    
                                        </InputGroup>
                                        <div className="mt-2 mb-2">
                                            Para acompanhar as estatísticas acesse <a href={`${URL}${code}/stats`}>{`${URL}${code}/stats`}</a>
                                        </div>
                                    </>
                                )
                            ) 
                        }

                        {
                            // Errors
                            errorMessage && <Alert variant="danger" className="mt-4">{errorMessage}</Alert>
                        }
                    </Form>
                </ContentContainer>
                <ContentContainer>
                    <Ads>Adsense</Ads>
                </ContentContainer>
            </Container>
        );
    }
}
export default HomePage;
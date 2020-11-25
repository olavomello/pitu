import React from "react";
import { Container, InputGroup, FormControl, Button, Alert } from "react-bootstrap";
import Header from "../../components/Header";
import { ContentContainer, Form } from "./styles";
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

    render(){
        return (
            <Container>
                <Header>Seu novo encurtador de URL.</Header>
                <ContentContainer>
                    <Form onSubmit={ this.handleSubmit }>
                        <InputGroup>
                            <FormControl
                                placeholder="Digite a URL para encurtar"
                                defaultValue=""
                                onCnange={ e => this.setState({ url : e.target.value })}
                            />    
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>                    
                        </InputGroup>
                    </Form>
                </ContentContainer>
            </Container>
        );
    }
}
export default HomePage;
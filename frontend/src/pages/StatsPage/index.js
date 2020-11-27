import React from "react";
import ConfigsVars from "../../configs/vars";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import ShortenerService from "../../services/shortenerService";
import { parseISO, formatRelative } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatsContainer, StatsBoxTitle, StatsRow, StatsBox } from "./styles";

class StatsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading : false,
            shortenedURL : {},
            errorMessage : ""
        };

    }

    async componentDidMount(){
        const { code } = this.props.match.params;
        try{
            const service = new ShortenerService();
            const shortenedURL = await service.getStats(code);

            const parsedDate = parseISO(shortenedURL.updatedAt);
            const currentDate = new Date();
            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale : ptBR
            });

            shortenedURL.relativeDate = relativeDate;

            this.setState({
                isLoading:false,
                shortenedURL
            });
        } catch( error ){
            this.setState({
                isLoading:false,
                errorMessage:`Ops... a URL informada não existe !`
            });
        }
    }

    render(){
        const URL = ConfigsVars.HOST_APP;
        const { errorMessage, shortenedURL } = this.state;
        return (
            <Container>
                <Header>Estatísticas de URL encurtada</Header>
                <StatsContainer className="text-center">
                {
                    errorMessage ? (
                        <>
                            <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle"/>
                            <p className="mt-2 mp-2">{errorMessage}</p>
                            <a href="/" className="btn btn-primary">Encurtar outra URL</a>
                        </>
                    ) : (
                        <>
                            <p>Confira abaixo as estatísticas de acesso de sua URL.</p><br/>
                            <h4>{URL}{shortenedURL.code}</h4>
                            <p>Redirecionando para : <b>{shortenedURL.url}</b></p>
                            <StatsRow className="col-12 col-lg-6">
                                <StatsBox>
                                    <b>{shortenedURL.hits}</b>
                                    <StatsBoxTitle>visitas</StatsBoxTitle>
                                </StatsBox>
                            </StatsRow>
                            <StatsRow className="col-12 col-lg-6">
                                <StatsBox>
                                    <b>{shortenedURL.relativeDate}</b>
                                    <StatsBoxTitle>último acesso</StatsBoxTitle>
                                </StatsBox>
                            </StatsRow>      
                            <hr/>
                            <a href="/" className="btn btn-primary">Encurtar outra URL</a>  
                            <br/><br/>                    
                        </>
                    )
                }
                </StatsContainer>
            </Container>
        );
    }
}
export default StatsPage;
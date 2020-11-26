import React from "react";

class Adsense  extends React.Component{
    constructor(props){
        super(props);
    }    
    render(){
        return(
            <>
                <div><font size=1>Publicidade:</font></div>
                <script data-ad-client="ca-pub-2533148814025391" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>            
            </>   
        );
    }
}

export default Adsense;
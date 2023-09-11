import React from "react";

class SatiliteImageComponent extends React.Component {

    render(){
        return (
           <img className="ui big bordered image" 
            style={{ filter: `brightness(${this.props.image.brightness})` }}
            src={this.props.image.url} />
        );
    };
}

export default SatiliteImageComponent;
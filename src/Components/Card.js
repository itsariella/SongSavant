import React from "react";
export default class Card extends React.Component {

    render() {
        let card = this.props.card
        return(
            <div>
                
                <img id = "prevImg" src={card.imageUrl} style={{width: '150px', height: '150px'}}/>

                <h3> {this.props.card.name} </h3>
            </div>
        );
    }
}
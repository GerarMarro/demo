import React from 'react';
import HeaderCards from './HeaderCards';
import ContentCards from './ContentCards';

class ContentAll extends React.Component {
    constructor(props){
        super(props);
        this.checkData = this.checkData.bind(this);
    }
    state={
        data:[],
        correo: "",
    }

    checkData = (data) =>{
        this.setState({
            data: data
        });
    }

    render(){
        return(
            <div className="App">
                <HeaderCards checkData={this.checkData} />
                <br />
                <div style={{minHeight:"59vh"}}>
                <ContentCards data={this.state.data} />
                </div>
            </div>
        )
    }
}

export default ContentAll;
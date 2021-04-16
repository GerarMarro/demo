import React from 'react';
import { Card, Result, notification, Typography, Space, Modal } from 'antd';
import { LikeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import ModificarNota from './ModificarNota';
import { format } from 'fecha';

const {Text, Title, Paragraph} = Typography;

class ContentCards extends React.Component {
    
    coloresRandom =() => {
        var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
        var letra = "";
        var contador = 1;
        var color = "#";
        do {
          var numero = Math.floor(Math.random() * ((letras.length)-0)+0);
          letra = letras[numero];
          color = color + letra;
          contador++;
    
        } while ( contador <= 6);
        return color;
    }
    
    openNotification = (placement, mensaje, descripcion, icon) => {
        notification.info({
          message: mensaje,
          description:
            descripcion,
          placement,
          icon: icon
        });
    };
    
    componentDidUpdate(){
        if (this.state.data.length === 0 && this.state.data.length !== this.props.data.length) {
            this.setState({
                data:this.props.data
            });    
            this.openNotification("topRight", "Listo!", "Tus notas han sido cargadas exitosamente", <CheckCircleOutlined style={{color:"green"}}/>);
        }
    }

    state ={
        data:[],
        visible: false,
        tetleModal: "",
        nota:[]
    }

    setModalVisible = () =>{
        this.setState({
            visible:false
        })
    }

    Resultado = () =>{
        
        return (
            <Result 
                icon={<LikeOutlined />}
                title="Tus notas aparecerán aquí"
                subTitle="Coloca tu correo electrónico para que puedas ver tus notas en esta área"
                style={{width:"100%", height:"100%"}}
            />
        )
    }

    Notas = () =>{
        return (
            <>
                {this.state.data.map((n, index)=>{
                    return( 
                        <div onClick={()=>{this.setState({visible:true, tetleModal:n.titulo, nota:n})}}>
                            <Card.Grid style={{ cursor:"pointer", backgroundColor:this.coloresRandom()}} key={index}>
                                
                                <Space direction="vertical">
                                    <Title level={3}>{n.titulo}</Title>
                                    <Title level={5}>Creado {format(new Date(n.created_at), '[el] DD/MM/YYYY [a las] HH:mm')}</Title>
                                    <Title level={5}>Actualizado {format(new Date(n.updated_at), '[el] DD/MM/YYYY [a las] HH:mm')}</Title>
                                    {n.asunto.map((a, index)=>{
                                        return(<Text strong key={index}>Asunto: {a.nombre}</Text>)
                                    })}
                                    <Paragraph>
                                        {n.descripcion}
                                    </Paragraph>
                                </Space>
                                
                            </Card.Grid>
                        </div>
                    )
                })}
                
            </>
        )
    }

    render(){
        return(
            <>
                <div style={{height:"100%"}}>
                    <Card style={{ width: "100%", minHeight:"55vh" }}>
                        {this.state.data.length === 0 ? <this.Resultado /> : <this.Notas />}     
                    </Card>
                </div>
                <Modal
                    title={this.state.tetleModal}
                    visible={this.state.visible}
                    footer={null}
                >
                    <ModificarNota nota={this.state.nota} setModalVisible={this.setModalVisible} />
                </Modal>
            </>
        )
    }
}

export default ContentCards;
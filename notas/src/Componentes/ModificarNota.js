import React from 'react';
import { Space, Input, Button, notification } from 'antd';
import { EditOutlined, CloseCircleOutlined, SaveOutlined, ExclamationCircleOutlined, CheckCircleOutlined, FileUnknownOutlined } from '@ant-design/icons';
import {DeleteNota, UpdateNota} from '../Datos/requests';

const { TextArea } = Input;

class ModificarNota extends React.Component {
    openNotification = (placement, mensaje, descripcion, icon) => {
        notification.info({
          message: mensaje,
          description:
            descripcion,
          placement,
          icon:icon
        });
    };

    state ={
        titulo: "",
        descripcion: "",
        nota: undefined
    }
    
    constructor(props){
        super(props);
        console.log(this.props.nota);
    }

     //Leo los datos
    handleChange = event =>{
        this.setState({
            [event.target.name]:event.target.value},()=>{
                //console.log(this.state);
                //console.clear();*/
        });
    }

    //Leo los datos del textArea
    handleTA = event =>{
        this.setState({
            [event.target.props.name]:event.target.value},()=>{
                //console.log(this.state);
                //console.clear();*/
        });
    }

    //Eliminar Nota
    EliminarNota = (id) =>{
        
        DeleteNota(id)
        .then(res =>{
            if (res.data === 1002) {
                this.openNotification("bottomLeft", "Nota Eliminada", "Su nota ha sido eliminada correctamente", <CheckCircleOutlined style={{color:"green"}} />);
                window.location.reload();
            }
        })
        .catch(error =>{
            this.openNotification("bottomLeft", "Algo salió mal", "Su nota no ha podido ser eliminada, estamos verificando ese problema, por favor intente más tarde", <CloseCircleOutlined style={{color:"red"}} />);    
            console.log(error);
        })
    }

    //Actualizar la nota
    Actualizar = (id) =>{
        
        UpdateNota(id, this.state, this.props.nota)
        .then(res =>{
            if (res.data !== 1001) {
                this.openNotification("bottomLeft", "Nota Actualizada", "Su nota ha sido actualizada correctamente", <CheckCircleOutlined style={{color:"green"}} />);
                window.location.reload();
            }else{
                this.openNotification("bottomLeft", "Nota no encontrada", "Su nota no ha sido encontrada", <FileUnknownOutlined style={{color:"#FFDD07"}} />);
            }
        })
        .catch(error =>{
            this.openNotification("bottomLeft", "Algo salió mal", "Su nota no ha podido ser actualizada, estamos verificando ese problema, por favor intente más tarde", <CloseCircleOutlined style={{color:"red"}} />);    
            console.log(error);
        })
    }

    render(){
        return (
            <>
                <Space direction="vertical" style={{width:"100%"}}>
                    <Input prefix={<EditOutlined />} defaultValue={this.props.nota.titulo} style={{width:"100%"}} onChange={this.handleChange} name="titulo" size="large" placeholder="Titulo" />
                    <TextArea defaultValue={this.props.nota.descripcion} name="descripcion" placeholder="Escriba aquí su nota" allowClear onChange={this.handleTA} />
                    <Space direction="horizontal" >
                        <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={()=>{
                                this.Actualizar(this.props.nota._id)
                            }}
                        >
                            Guardar
                        </Button>
                        <Button
                            type="danger"
                            icon={<CloseCircleOutlined />}
                            onClick={() => {
                                this.EliminarNota(this.props.nota._id)
                            }}
                        >
                            Eliminar nota
                        </Button>
                        <Button
                            style={{backgroundColor:"#FFDD07", color:"white"}}
                            icon={<ExclamationCircleOutlined />}
                            onClick={() => { this.props.setModalVisible(false)}}
                        >
                            Cancelar
                        </Button>
                    </Space>
                </Space>
            </>
        )
    }
}

export default ModificarNota;
import React from 'react';
import Crear from './CrearNota';
import { Card, Input, Tooltip, Modal, notification, Radio } from 'antd';
import { LoadingOutlined, InfoCircleOutlined, UserOutlined, FileUnknownFilled, CloseCircleOutlined } from '@ant-design/icons';
import { NotaxCorreo } from '../Datos/requests';

const {Search} = Input;

class HeaderCards extends React.Component {
    openNotification = (placement, mensaje, descripcion, icono) => {
        notification.info({
          message: mensaje,
          description:
            descripcion,
          placement,
          icon: icono
        });
    };
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    state ={
        titulo: "Buscar",
        informacion: "Buscar sus notas",
        correo: "",
        modalVisible: false,
        notas: [],
        reload: false
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible: modalVisible });
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value},()=>{
                //console.log(this.state);
                //console.clear();*/
        });
    }

    TraerNotas = () =>{
        NotaxCorreo(this.state)
        .then(res=>{
            if (res.data === 1001 || res.data.length === 0) {
                this.openNotification("topRight", "No se encontrarón notas", "No hay notas registradas con ese email.", <FileUnknownFilled style={{color:"#FFDD07"}} />)
                this.setState({
                    reload: false
                });
            }else{
                this.openNotification("topRight", "Estamos preparando todo", "Tus notas aparecerán en breve", <LoadingOutlined />);
                this.setState({
                    notas : res.data,
                    reload: true
                });
                this.props.checkData(this.state.notas);
            }
        }).catch(error=>{
            this.openNotification("topRight", "Algo salió mal", "Ha ocurrido un error, estamos trabajando en ello, intenta más tarde por favor.", <CloseCircleOutlined style={{color:"red"}} />)
            console.log(error)
        })
    }



    render(){
        return(
            <div>
                <Card title={this.state.titulo} extra=
                { 
                    <Radio.Group>
                        <Radio.Button onClick={() => this.setModalVisible(true)} type="primary" shape="round" size="large"> Crear </Radio.Button>
                        {this.state.reload === false ? 
                        <Radio.Button disabled type="primary" shape="round"  size="large"> Nueva busqueda </Radio.Button>:
                        <Radio.Button onClick={() => window.location.reload()} type="primary" shape="round" size="large"> Nueva busqueda </Radio.Button>
                        }
                    </Radio.Group>
                    } style={{ width: "100%", height:"10%" }}>

                    <Search 
                        disabled={this.state.reload}
                        placeholder="Ingrese su email" 
                        prefix={
                            <UserOutlined />
                        }
                        name="correo"
                        onSearch={this.TraerNotas} 
                        suffix={
                            <Tooltip title={this.state.informacion}>
                                <InfoCircleOutlined />
                            </Tooltip>
                        }
                        onChange={this.handleChange}
                        enterButton 
                    />
                </Card>
                <Modal
                    title="Crear Nota"
                    key="Modal"
                    style={{ top: 20 }}
                    visible={this.state.modalVisible}
                    //onOk={()=> {this.setState({modalVisible:false, isok:true}); this.handleChildUnmount()}}
                    //onCancel={() => this.setModalVisible(false)}
                    footer={null}
                >
                    <div id="Modal">
                        <Crear setModalVisible={this.setModalVisible} />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default HeaderCards;
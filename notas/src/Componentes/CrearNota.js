import React from 'react';
import { Input, Space, Select, notification, Popover, Button } from 'antd';
import { EditOutlined, UserOutlined, SaveOutlined, CloseCircleOutlined, CheckCircleOutlined, CloseCircleFilled, FileUnknownOutlined } from '@ant-design/icons';
import {getTemas, CreateNota } from '../Datos/requests';

const { TextArea } = Input;
const { Option } = Select;

class Crear extends React.Component {
    openNotification = (placement, mensaje, descripcion, icon) => {
        notification.info({
          message: mensaje,
          description:
            descripcion,
          placement,
          icon:icon
        });
    };
    
    titulo = "";
    
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    //Estado
    state = {
        titulo: "",
        correo: "",
        tarea: "",
        descripcion: "",
        asunto: "",
        temas: [],
        visible: false,
        cambiara: false,
        crear: ""
    }

    /**Obtiene los temas al momento en que el componente esta montado */
    componentDidMount(){
        getTemas()
        .then(res =>{
            console.log(res)
            if (res.data !== undefined) {
                this.setState({
                    temas: res.data
                })    
            }
        })
        .catch(error=>{
            console.error(error);
        })
    }

    //Creara la nota cuando el componente se vaya a desmontar
    componentWillUnmount(){
        console.log("Entro");
        if (this.props.isok) {
            this.CrearNota();
        }
    }

    //Leo los datos
    handleChange = event =>{
        this.setState({
            [event.target.name]:event.target.value},()=>{
                //console.log(this.state.titulo);
                //console.clear();*/
        });
    }

    /**Leo los datos del TextArea */
    handleTA = event =>{
        this.setState({
            [event.target.props.name]:event.target.value},()=>{
                //console.log(this.state);
                //console.clear();*/
        });
    }

    /**Leo los datos del select */
    onChange(value) {
        this.setState({
            asunto: value },()=>{
                //console.log(this.state);
                //console.clear();
        });
    }

    /**Leo el dato al momento de buscar, en caso de que exista o no el tema */
    onSearch(value) {
        this.setState({
            visible: true
        })
        if (value !== "") {
            this.titulo = value;
        }

    }

    /**Es el componente que tiene adentro el Popover */
    ComponentePopover = (
        <> 
            <Space direction="horizontal">
                <Button onClick={()=>{this.setState({cambiara:true, crear: "Crear nuevo asunto: ", visible:false},()=>{}); console.log(this.state)}}>Si</Button>
                <Button onClick={()=>{this.setState({cambiara:false, visible:false}); this.titulo=""}}>No</Button>
            </Space>
        </>
    )

    //Crea la nota
    CrearNota = () =>{
        
        if (this.state.titulo!== "" || this.state.descripcion !== "" || this.state.asunto !== "" || this.state.correo !== "") {
            CreateNota(this.state, this.titulo)
            .then(res=>{
                this.openNotification("bottomRight", "Nota Creada", "Tu nota ha sido creada exitosamente gracias por apoyarnos", <CheckCircleOutlined style={{color:"green"}} />);
                console.log(res);
                window.location.reload();
            })
            .catch(error=>{
                this.openNotification("bottomRight", "Tu nota no fue creada", "Pasó algo malo, seguramente estamos averiguando que es, intenta más tarde", <CloseCircleFilled style={{color:"red"}} />);
                console.log(error);
            }) 
        }else{
            this.openNotification("bottomRight", "Campos vacíos", "Asegurate que todos los campos esten llenos", <FileUnknownOutlined style={{color:"#FFDD07"}} />);
        }
        this.props.setModalVisible(false);
    }

    render(){
        return (
            <>
                <Space direction="vertical" style={{width:"100%"}}>
                    
                    <Input prefix={<EditOutlined />} style={{width:"100%"}} onChange={this.handleChange} name="titulo" size="large" placeholder="Titulo" />
                    <Input prefix={<UserOutlined />} style={{width:"100%"}} onChange={this.handleChange} name="correo" size="large" placeholder="Email" />
                    <Popover
                        content={this.ComponentePopover}
                        title={"¿Crear Asunto " + this.titulo + "? en caso de no encontrarlo."}
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisiblePopover}
                    >
                        <Select
                            showSearch
                            placeholder="Selecciona o crea un asunto"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            onSearch={this.onSearch}
                            size="large"
                            style={{width:"100%"}}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.state.temas.map((t, index)=>{
                                return <Option key={index} value={t._id}>{t.nombre}</Option>
                            })}
                        </Select>
                        {this.state.cambiara ? this.state.crear + this.titulo : ""}
                    </Popover>
                    <TextArea prefix={<EditOutlined />} name="descripcion" placeholder="Escriba aquí su nota" allowClear onChange={this.handleTA} />
                    <Space direction="horizontal">
                        <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={this.CrearNota}
                        >
                            Guardar
                        </Button>
                        <Button
                        type="danger"
                        icon={<CloseCircleOutlined />}
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

export default Crear;
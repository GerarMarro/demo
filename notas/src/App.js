import './App.css';
import 'antd/dist/antd.css';
import { Layout, Typography } from 'antd';
import ContentAll from './Componentes/ContentAll';

const { Header, Content, Footer } = Layout;
const {Title} = Typography;

function App() {
  return (
    <div>
      <Layout className="layout">
        <Header>
          {/*<div className="#" />*/}
          <Title level={4} style={{color:"white"}}>Prueba de componente</Title>
        </Header>
        <Content style={{ padding: '0 50px', height: '100%' }}>
          <ContentAll />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Creado por Grupo N°1 Tecnologías Emergentes</Footer>
      </Layout>
    </div>
  );
}

export default App;

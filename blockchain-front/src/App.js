import './App.css';
import Container from './components/UI/container/Container';
import ContainerItem from './components/UI/container/ContainerItem';
import Header from './components/UI/header/Header';
import Section from './components/UI/section/Section';
import Wallet from './components/wallet/Wallet';

function App() {
  return (
    <>
    <Header title="JsCoin" />
    <div className="App">
      <Section title="Carteiras">
        <Wallet />
      </Section>
      <Section title="edão bicha">
        <p>content</p>
      </Section>

      <Container>
        <ContainerItem />
        <ContainerItem />
      </Container>
    </div>
    </>
  );
}

export default App;

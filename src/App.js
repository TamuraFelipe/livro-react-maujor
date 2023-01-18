import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { Topo } from './components/Topo';
import { Rodape } from './components/Rodape';
import { Home } from './components/Home';
import { Frontend } from "./components/Frontend";
import { Programacao } from "./components/Programacao";
import { Design } from "./components/Design";
import { Catalogo } from './components/Catalogo';
import { Livro } from './components/Livro';
import { NotFound } from './components/NotFound';

import "./styles/index.css";
import axios from "axios";

class App extends Component {
  state = {
    livros: [],
  };
  
  async componentDidMount(){
    try{
      const { data: livros } = await axios.get("./api/todosOsLivros.json");
      this.setState({ livros });
    } catch(error){
      console.error(error);
      document.querySelectorAll(".principal")[0].insertAdjacentHTML("beforeend", <p className="erro">Mensagem de erro</p>)
    }
  }
  
  render(){
    return (
      <BrowserRouter>
        
        <Topo />
        
        <Switch>
            <Route exact path="/" render={() => <Home livros = {this.state.livros}/>} />
            <Route exact path="/frontend" render={() => <Frontend livros = {this.state.livros}/>} />
            <Route exact path="/programacao" render={() => <Programacao livros = {this.state.livros}/>} />
            <Route exact path="/design" render={() => <Design livros = {this.state.livros}/>} />
            <Route exact path="/catalogo" render={() => <Catalogo livros = {this.state.livros}/>} />
            <Route path="/livro/:livroSlug" render = { props => {
              const livro = this.state.livros
              .find(
                livro => livro.slug === props.match.params.livroSlug);
                if (livro) return <Livro livro = {livro} />;
                else return <NotFound />
              }}
              />
              <Route component={NotFound} />
        </Switch>
        
        <Rodape />
      
      </BrowserRouter>
  );
  }
}

export default App;

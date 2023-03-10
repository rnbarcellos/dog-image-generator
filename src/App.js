import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    imageUrl: '',
    isLoading: true,
    breed: '',
  };

  componentDidMount() {
    if (localStorage.length > 0) {
      this.getDoguinho();
      return;
    }
    this.generateDog();
  }

  shouldComponentUpdate(_, nextState) {
    const { imageUrl } = nextState;
    return !(imageUrl.includes('terrier'));
  }

  componentDidUpdate() {
    const { imageUrl } = this.state;
    localStorage.setItem('doguinho', imageUrl);   
  }

  generateDog = async () => {
    try {
      const endpoint = 'https://dog.ceo/api/breeds/image/random';
      const response = await fetch(endpoint);
      const data = await response.json();
      const dogBreed = data.message.split('/')[4];
      this.setState({
        imageUrl: data.message,
        isLoading: false,
        breed: dogBreed.toUpperCase(),
      });
    } catch (error) {
      alert(error.message);
    }
  };

  getDoguinho = () => {
    const doguinho = localStorage.getItem('doguinho') || '';
    const dogBreed = doguinho.split('/')[4];
    this.setState({
      imageUrl: doguinho,
      isLoading: false,
      breed: dogBreed.toUpperCase(),
    });
  };

  render() {
    const { imageUrl, isLoading, breed } = this.state;
    return (
      <div>
        <h1>{ breed }</h1>
        { isLoading ? <h2>Loading...</h2>
          : <img src={ imageUrl } alt="Doguinho aleatório" />}
        <br />
        <input type="button" value="Novo doguinho!" onClick={ this.generateDog } />
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    imageUrl: '',
    isLoading: true,
  };

  async componentDidMount() {
    this.generateDog();
  }

  shouldComponentUpdate(_, nextState) {
    const { imageUrl } = nextState;
    return !(imageUrl.includes('terrier'));
  }

  componentDidUpdate() {
    const { imageUrl } = this.state;
    window.localStorage.setItem('doguinho', imageUrl);
    const breed = imageUrl.split('/');
    alert(breed[4]);
  }

  generateDog = async () => {
    const endpoint = 'https://dog.ceo/api/breeds/image/random';
    const response = await fetch(endpoint);
    const data = await response.json();
    this.setState({ imageUrl: data.message, isLoading: false });
  };

  render() {
    const { imageUrl, isLoading } = this.state;
    return (
      <div>
        <h1>Doguinhos</h1>
        { isLoading ? <h2>Loading...</h2>
          : <img src={ imageUrl } alt="Doguinho aleatório" />}
        <input type="button" value="Novo doguinho!" onClick={ this.generateDog } />
      </div>
    );
  }
}

export default App;

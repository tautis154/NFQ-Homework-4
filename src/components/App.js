import React from 'react';
import Card from './Card';
import axios from 'axios';
import { endpoints, getImageUrl } from '../config';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      list: [],
      genres: [],
      filter: -1,
      likes: new Map(),
    };
    this.eventHandler = this.eventHandler.bind(this);
  }

  componentDidMount() {
    axios
        .get(endpoints.mostPopularMovies())
        .then((data) => {
          this.setState({
            list: data.data.results,
          });
          data.data.results.map((movie) => {
            this.setState(prevState => ({
              likes: prevState.likes.set(movie.original_title,false)
            }))
          })
        });

    axios
        .get(endpoints.genres())
        .then((data) => {
          this.setState({
            genres: data.data.genres,
          });
        });
  }

    eventHandler(title, value){
      this.setState(prevState => ({
        likes: prevState.likes.set(title,value)
      }));
    }

    Filtering = (id) => {
      if (this.state.filter == id){
        this.setState( {
          filter: -1,
        });
      }
      else{
        this.setState( {
          filter: id,
        })
      }
    }

  getTitle = (title) => {
    console.log(title);
  };


  render() {

    return (
        <div>
          <div>
          {this.state.genres.map((genre) => (
                <button onClick={() => {
                  this.Filtering(genre.id)
                }}> {genre.name} </button>
          ))}

          </div>
          {
            this.state.list.filter((movie) => {
              if(this.state.filter != -1 ){
                return movie.genre_ids.indexOf(this.state.filter) > -1
              }
              else{
                return true
              }
            }).map((card) => (
                <Card
                    eventHandler={this.eventHandler}
                    isLiked={this.state.likes.get(card.original_title)}
                    getTitle={this.getTitle}
                    key={card.original_title}
                    backgroundImage={getImageUrl(card.backdrop_path)}
                    date={card.release_date}
                    rating={card.vote_average}
                    votes={card.vote_count}
                    description={card.overview}
                    title={card.original_title}

                />
            ))}
        </div>
    );
  }
}




export default App;

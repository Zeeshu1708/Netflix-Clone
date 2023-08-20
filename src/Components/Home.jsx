import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apikey = "76de5365fba15aa770b0eabd6fdac67b";
const url = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({imgsrc}) =>(
  <img className="card" src={imgsrc} alt="cover" />
);
const Row = ({title, arr=[] }) =>(
  <div className="row">
  <h2>{title}</h2>
  <div>
  {
    arr.map((item,index)=>(
      <Card key={index} imgsrc={`${imgUrl}/${item.poster_path}`} />
    ))
  }
  </div>
  </div>
)

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedrMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {

    const fetchupcoming = async() => {
       const {data:{results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);
       setUpcomingMovies(results);
       console.log(results);
    };
    const fetchpopular = async() => {
       const {data:{results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`);
       setnowPlayingMovies(results);
    };
    const fetchupnowplaying = async() => {
       const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);
       setPopularMovies(results);
    };
    const fetchtopRated = async() => {
       const {data:{results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);
       setTopRatedrMovies(results);
    };
    const getAllGenre = async () => {
      const {
          data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setGenre(genres);
      // console.log(genres);
  };



    fetchupcoming();
    fetchpopular();
    fetchupnowplaying();
    fetchtopRated();
    getAllGenre();

  }, [])



  return (
    <section className="home">
          {/* <div className="banner" style={{backgroundImage: popularMovies[3]
                        ? `url(${`${imgUrl}/${popularMovies[3].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            > */}
          <div className="banner" >
          <h1>Oppenheimer</h1>
          <p>The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.</p>
          <div >
          <button>Play  <BiPlay/> </button>
          <button>My List <AiOutlinePlus/> </button>
          </div>
          </div>
      <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
      <Row title={"Available Movies"} arr={nowPlayingMovies}/>
      <Row title={"Popular Movies"} arr={popularMovies}/>
      <Row title={"Top Rated Movies"} arr={topRatedMovies}/>

      <div className="genreBox">
        {
          genre.map((item)=>(
            <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
          ))
        }
      </div>
    </section>
  )
}



export default Home

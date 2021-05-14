import React, { useEffect, useState } from 'react';
import Character from './components/Character';
import './App.css';
import axios from 'axios';


const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [mass, setMass] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [skinColor, setSkinColor] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("");
  const [homeworld, setHomeworld] = useState("");
  const [films, setFilms] = useState(""); 
  const [species, setSpecies] = useState("");
  const [vehicles, setVehicles] = useState("");
  const [starships, setStarships] = useState("");
  const [created, setCreated] = useState("");
  const [edited, setEdited] = useState("");
  const [url, setUrl] = useState("");
  const [obj, dispatchObj] = useState("");

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  const factory = createObject => {
    let roster = [];
    
    console.log('createObject ', createObject);
    createObject.forEach(async character => {
      dispatchObj(character);
      await detailsOf();
    });

    console.log(roster)
    return roster;
  }

  const dryer = name => {
    if(name !== "") {
      return;
    } else {
      setTimeout(() => {
        dryer(name)
      }, 1000)
    }
  }

  const setter = async () => {
    const i = 0;
    const character = obj;
    console.log(character)
    setName(character.name);
    setHeight(character.height);
    setMass(character.mass);
    setHairColor(character.hair_color);
    setEyeColor(character.eye_color);
    setSkinColor(character.skin_color);
    setBirthYear(character.birth_year);
    setGender(character.gender);
    setHomeworld(character.homeworld);
    setFilms(character.films);
    setSpecies(character.species);
    setVehicles(character.vehicles);
    setStarships(character.starships);
    setCreated(character.created);
    setEdited(character.edited);
    setUrl(character.url);

   return dryer(name) 
  }


  const detailsOf = async () => {
    async function wait() { setter(obj) };
    await wait();
    console.log(name);
    return {
      name,
      height,
      mass,
      hairColor,
      eyeColor,
      skinColor,
      birthYear,
      gender,
      homeworld,
      films,
      species,
      vehicles, 
      starships,
      created,
      edited,
      url
    }
  }
  // hairColor, eyeColor, birthYear and skinColor all use snakecase within the response.
  // (i.e. hair_color)
  useEffect(() => {
    let val = 0;
    async function fetcher() {
      val = axios.get("https://swapi.dev/api/people")
                  .then(res => res.data)
                  .catch(err => {
                    console.log(err);
                  });

      return val;
    };

    try {
      const result = fetcher().then(res => factory(res)).catch(err => console.log(err))

      console.log(result);
    } catch {
      console.log("fetcher issue");
    }
  }, []);

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <Character
        name={name}
        height={height} 
        mass={mass} 
        hairColor={hairColor} 
        eyeColor={eyeColor} 
        skinColor={skinColor} 
        birthYear={birthYear} 
        gender={gender} 
        homeworld={homeworld} 
        films={films} 
        species={species} 
        vehicles={vehicles} 
        starships={starships} 
        created={created} 
        edited={edited} 
        url={url} 
      />
    </div>
  );
}

export default App;

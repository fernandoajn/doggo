import React, { useState, useEffect } from 'react';
import { MdPets, MdKeyboardArrowDown } from 'react-icons/md'
import Loader from 'react-loader-spinner'

import api from '../services/api';

function Container() {
  const [loadingContent, setLoadingContent] = useState(true);

  const [dogName, setDogName] = useState(() => {
    const storaged = localStorage.getItem('@doggo:dogName');

    if(storaged) {
      return storaged;
    }

    return 'Default';
  });

  const [dogBreed, setDogBreed] = useState(() => {
    const storaged = localStorage.getItem('@doggo:dogBreed');

    if(storaged) {
      return storaged;
    }

    return 'vira-lata';
  });

  const [dogImage, setDogImage] = useState(() => {
    const storaged = localStorage.getItem('@doggo:dogImage');

    if(storaged) {
      return storaged;
    }
  });

  const [textColor, setTextColor] = useState(() => {
    const storaged = localStorage.getItem('@doggo:textColor');

    if(storaged) {
      return storaged;
    }

    return '#fff';
  });

  const [font, setFont] = useState(() => {
    const storaged = localStorage.getItem('@doggo:font');

    if(storaged) {
      return storaged;
    }

    return 'Roboto Slab';
  });

  const [breeds, setBreeds] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true);


  const colors = [
    '#ffffff',
    '#43d8c9',
    '#eb6383',
    '#ffd31d',
    '#f57b51'
  ];

  const fonts = [
    'Roboto Slab',
    'Archivo Narrow',
    'Cinzel',
    'Inconsolata',
    'Lobster Two'
  ]

  useEffect(() => {
    async function loadBreeds() {
      const { data } = await api.get('/breeds/list/all');

      const { message } = data;

      let newBreeds = [];

      for (let [key, value] of Object.entries(message)) {
        if(value.length > 0) {
          value.forEach(item => newBreeds.push(`${item} ${key}`));
        } else {
          newBreeds.push(`${key}`);
        }
      }

      setBreeds(newBreeds);
      setLoadingContent(false);
    }

    loadBreeds();
  }, [loadingContent]);

  useEffect(() => {
    async function loadDogImage() {
      setLoadingImage(true);
      const splittedBreed = dogBreed.split(' ');

      const url = `/breed/${dogBreed}/images/random`;
      const houndUrl = `/breed/${splittedBreed[1]}/${splittedBreed[0]}/images/random`;

      const { data } = await api.get(dogBreed.split(' ').length > 1 ? houndUrl : url);

      const { message } = data;

      setDogImage(message);
      setLoadingImage(false);
    }

    loadDogImage();
  }, [dogBreed]);

  function handleDogName(e) {
    let name = e.target.value;

    setDogName(name);
  }

  function handleBreed(e) {
    let breed = e.target.value;

    setDogBreed(breed);
  }

  function handleTextColor(color) {
    setTextColor(color);
  }

  function handleFont(font) {
    setFont(font);
  }

  function saveData(e) {
    e.preventDefault();

    localStorage.setItem("@doggo:dogName", dogName);
    localStorage.setItem("@doggo:dogBreed", dogBreed);
    localStorage.setItem("@doggo:dogImage", dogImage);
    localStorage.setItem("@doggo:textColor", textColor);
    localStorage.setItem("@doggo:font", font);

    alert("Dados salvos com sucesso!");
  }

  return (
    <>
    {loadingContent ?
    <div className="loading_container">
      <Loader type="Oval" color="#fff" height={50} width={50}/>
    </div> :

    <section className="container">
      <div className="container__form">

        <form onSubmit={saveData}>
          <div className="input__container">
            <select name="breeds" id="breeds" onChange={handleBreed}>
              {breeds.map((breed) => (
                <option value={breed} key={breed} selected={breed === dogBreed}>{breed}</option>
                ))}
            </select>
            <MdKeyboardArrowDown size={26} color={'#4EAB6F'} />
          </div>

          <div className="input__container">
            <MdPets size={22}/>
            <input type="text" placeholder="Digite um nome" onChange={handleDogName} value={dogName}/>
          </div>

          <div className="buttons__container">
            {colors.map(color => (
              <button type="button" onClick={() => handleTextColor(color)} style={{backgroundColor: color}}></button>
            ))}
          </div>

          <div className="fonts__container">
            {fonts.map(font => (
              <button type="button" onClick={() => handleFont(font)} style={{fontFamily: font}}>{font}</button>
            ))}
          </div>

          <div className="submit__container">
            <button>Salvar</button>
          </div>
        </form>
      </div>

      <div className="container__info">
        <div className="container__info--image">
          {loadingImage ? <Loader type="ThreeDots" color={textColor} height={50} width={50}/> :
          <img src={dogImage} alt="DogImage"/>}

          <div className="dog_info" style={{color: textColor, fontFamily: font}}>
            <strong>{dogName}</strong>
            <span>{dogBreed}</span>
          </div>
        </div>

      </div>
    </section>
}
    </>
  );
}

export default Container;

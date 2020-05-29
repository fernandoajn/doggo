import React, { useState, useEffect } from 'react';
import { MdPets, MdKeyboardArrowDown } from 'react-icons/md'
import Loader from 'react-loader-spinner'

import Preview from '../components/Preview';

import { useDogInfo } from '../hooks/dogInfo';

import api from '../services/api';

function Container() {
  const [loadingContent, setLoadingContent] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const { dogName, dogBreed, dogImage, setDogName, textColor, font, setDogBreed, setTextColor, setFont } = useDogInfo();

  const colors = [
    '#2FC4B2',
    '#FF926B',
    '#EDF2F4',
    '#FFCA3A',
    '#A5CDD4',
  ];

  const fonts = [
    'Roboto Slab',
    'Raleway',
    'Cinzel',
    'Quicksand',
    'Fredericka the Great'
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
    localStorage.setItem("@doggo:dateTime", JSON.stringify(new Date()));

    alert("Dados salvos com sucesso!");
  }

  return (
    <>
    {loadingContent ?
    <div className="loading">
      <Loader type="Oval" color="#fff" height={50} width={50}/>
    </div> :

    <section className="container">
      <div className="container__form">
        <form onSubmit={saveData}>
          <div className="form__input">
            <select name="breeds" id="breeds" onChange={handleBreed} defaultValue={dogBreed} required>
              <option value="" >Escolha uma raça</option>
              {breeds.map((breed) => (
                <option value={breed} key={breed}>{breed}</option>
                ))}
            </select>
            <MdKeyboardArrowDown size={30} />
          </div>

          <div className="form__input">
            <MdPets size={22}/>
            <input type="text" placeholder="Digite um nome" onChange={handleDogName} value={dogName} required/>
          </div>

          <div className="form__colors">
            {colors.map((color, index) => (
              <button type="button" key={index} onClick={() => handleTextColor(color)} style={{backgroundColor: color}}>
                <span>{color}</span>
              </button>
            ))}
          </div>

          <div className="form__fonts">
            {fonts.map((font, index) => (
              <button type="button" key={index} onClick={() => handleFont(font)} style={{fontFamily: font}}>{font}</button>
            ))}
          </div>

          <div className="form__submit">
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>

      <div className="container__info">
        <Preview />
      </div>
    </section>
}
    </>
  );
}

export default Container;

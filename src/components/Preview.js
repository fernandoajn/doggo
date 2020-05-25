import React, { useState, useEffect, useRef } from 'react';
import Loader from 'react-loader-spinner';

import { useDogInfo } from '../hooks/dogInfo';

import api from '../services/api';

function Preview() {
  const [loadingImage, setLoadingImage] = useState();
  const { dogName, dogBreed, dogImage, textColor, font, setDogImage } = useDogInfo();
  const didUpdateRef = useRef(false);

  useEffect(() => {
    async function loadDogImage() {
      setLoadingImage(true);
      // Verificar se a raça é um nome composto
      const splittedBreed = dogBreed.split(' ');

      const singleURN = `/breed/${dogBreed}/images/random`;
      const doubleURN = `/breed/${splittedBreed[1]}/${splittedBreed[0]}/images/random`;

      const { data } = await api.get(dogBreed.split(' ').length > 1 ? doubleURN : singleURN);

      const { message } = data;

      setDogImage(message);
      setLoadingImage(false);
    }

    if (didUpdateRef.current) {
      loadDogImage();
    } else {
      didUpdateRef.current = true;
    }
  }, [dogBreed, setDogImage]);

  return (
    <div className="container__info--image">
      {loadingImage ?
      <Loader type="ThreeDots" color={textColor} height={50} width={50}/> :
      <img src={dogImage} alt="DogImage"/>}

      <div className="dog_info" style={{color: textColor, fontFamily: font}}>
        <strong>{dogName}</strong>
        <span>{dogBreed}</span>
      </div>

    </div>
  );
}

export default Preview;

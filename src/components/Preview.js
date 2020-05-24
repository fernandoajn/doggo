import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import { useDogInfo } from '../hooks/dogInfo';

import api from '../services/api';

function Preview() {
  const [loadingImage, setLoadingImage] = useState(true);

  const { dogName, dogBreed, dogImage, textColor, font, setDogImage } = useDogInfo();

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
  }, [dogBreed, setDogImage]);

  return (
    <div className="container__info--image">
      {loadingImage ? <Loader type="ThreeDots" color={textColor} height={50} width={50}/> :
      <img src={dogImage} alt="DogImage"/>}

      <div className="dog_info" style={{color: textColor, fontFamily: font}}>
        <strong>{dogName}</strong>
        <span>{dogBreed}</span>
      </div>
    </div>
  );
}

export default Preview;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MdCached } from 'react-icons/md';
import Loader from 'react-loader-spinner';

import { useDogInfo } from '../hooks/dogInfo';
import defaultImage from '../assets/whitelogo.png';

import api from '../services/api';

function Preview() {
  const [loadingImage, setLoadingImage] = useState();
  const { dogName, dogBreed, dogImage, textColor, font, setDogImage } = useDogInfo();
  const didUpdateRef = useRef(false);

  const loadDogImage = useCallback(async () => {
    setLoadingImage(true);
    const splittedBreed = dogBreed.split(' ');

    const singleURN = `/breed/${dogBreed}/images/random`;
    const doubleURN = `/breed/${splittedBreed[1]}/${splittedBreed[0]}/images/random`;

    const { data } = await api.get(dogBreed.split(' ').length > 1 ? doubleURN : singleURN);

    const { message } = data;

    setDogImage(message);
    setLoadingImage(false);
  }, [dogBreed, setDogImage]);

  useEffect(() => {
    if (didUpdateRef.current) {
      loadDogImage();
    } else {
      didUpdateRef.current = true;
    }
  }, [dogBreed, setDogImage, loadDogImage]);

  return (
    <div className="container__info--image" >
      {loadingImage ?
      <Loader type="ThreeDots" color="#fff" height={50} width={50}/> :
      <>
        {dogImage ?
          <>
          <button type="button" onClick={loadDogImage}>
            <span>Trocar imagem</span>
            <MdCached size={24} />
          </button>
          <img src={dogImage} alt="DogImage" className="dog-image"/>
          </> :
          <img src={defaultImage} alt="doggo." className="default-image"/>
        }
      </>
      }

      <div className="dog_info" style={{color: textColor, fontFamily: font}}>
        <strong>{dogName}</strong>
        <span>{dogBreed}</span>
      </div>

    </div>
  );
}

export default Preview;

import { StaticImageData } from "next/image";

export interface Location {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  placeId: string;
}

export interface IWorks {
  id: number;
  frontImage: StaticImageData;
  description: string;
  modalInfo: {
    video: string;
    title: string;
    modalDescription: string;
    images: StaticImageData[];
  };
}

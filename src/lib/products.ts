import sneakerWhite from '@/assets/sneaker-white.png';
import sneakerBlack from '@/assets/sneaker-black.png';
import sneakerRed from '@/assets/sneaker-red.png';
import sneakerGrey from '@/assets/sneaker-grey.png';
import sneakerBlue from '@/assets/sneaker-blue.png';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 'air-phantom-x',
    name: 'Air Phantom X',
    tagline: 'Engineered for the fearless.',
    price: 219,
    image: sneakerWhite,
    colors: ['White', 'Black', 'Grey'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.9,
    reviews: 2847,
  },
  {
    id: 'shadow-runner-pro',
    name: 'Shadow Runner Pro',
    tagline: 'Darkness meets speed.',
    price: 189,
    image: sneakerBlack,
    colors: ['Black', 'Grey'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.8,
    reviews: 1923,
  },
  {
    id: 'blaze-fury-max',
    name: 'Blaze Fury Max',
    tagline: 'Ignite every step.',
    price: 249,
    image: sneakerRed,
    colors: ['Red', 'Black'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.7,
    reviews: 3102,
  },
  {
    id: 'cloud-drift-elite',
    name: 'Cloud Drift Elite',
    tagline: 'Walk on air.',
    price: 199,
    image: sneakerGrey,
    colors: ['Grey', 'White'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.9,
    reviews: 1456,
  },
  {
    id: 'velocity-surge',
    name: 'Velocity Surge',
    tagline: 'Unstoppable momentum.',
    price: 229,
    image: sneakerBlue,
    colors: ['Blue', 'White', 'Black'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.8,
    reviews: 2210,
  },
  {
    id: 'stealth-glide',
    name: 'Stealth Glide',
    tagline: 'Silent. Swift. Supreme.',
    price: 269,
    image: sneakerBlack,
    colors: ['Black'],
    sizes: ['7', '8', '9', '10', '11'],
    rating: 5.0,
    reviews: 891,
  },
];

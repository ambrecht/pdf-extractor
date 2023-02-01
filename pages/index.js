import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import ChatGPT from '../components/chatGTP';
import RandomPara from '../components/random';
import TextEditor from '../components/TextEditor';

import PDFInput from '../components/PDFInput';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <RandomPara></RandomPara>
    </>
  );
}

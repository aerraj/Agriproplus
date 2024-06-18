
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Carousel from '../components/Carousel';
import TextCarousel from '../components/TextCarousel';


export default function Home() {
  const images = [
    '/1-full.jpeg',
    '/Agriculture.jpeg',
    '/2-full.jpeg'
  ];
  return (
    <div>
             <Navbar/>
           
           <Hero/>
          
           <TextCarousel />
           <Features/>
           <Carousel images={images} />
           <Footer/>
    </div>
  )
}

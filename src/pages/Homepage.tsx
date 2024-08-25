

import About from '../components/user/About';
import Footer from '../components/user/Footer';
import Header from '../components/user/header/Header'
import Hero from '../components/user/Hero';


function Homepage() {
  return (
    <div className=''>
      <Header />
      <Hero />
      <About />
      <Footer />
    </div>
  )
}

export default Homepage
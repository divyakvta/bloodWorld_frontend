
import Logo from './Logo'
import Nav from './Nav'


function Header() {
  return (
    <div className='sticky top-0 flex-wrap z-20 mx-auto  bg-white flex w-full items-center justify-between py-3 px-7'>
    
      <Logo />
      <Nav />
      </div>
  )
}

export default Header
import Socials from './Socials'
// import helloWordArr from '../hello'

export default () => {
  // const helloWord = helloWordArr[Math.floor((Math.random() * helloWordArr.length))]
  
  return (
    <header class="mt-12 md:mt-18">
      <h1 class="title text-5xl font-bold">
        <span class="block">Hello, </span>
        <span class="block mt-2">I'm Diu.</span>
      </h1>
      <div class="mt-6">
        <div>
          <span>Front-end developer / Amateur designer.</span>
        </div>
        <div mt-2>
          <span>Currently working at DiDi.</span>
        </div>
        <div mt-2>
          <span>I like making interesting projects.</span>
        </div>
      </div>
      <Socials />
    </header>
  )
}
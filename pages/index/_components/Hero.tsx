import Socials from './Socials'
// import helloWordArr from '../hello'

export default () => {
  // const helloWord = helloWordArr[Math.floor((Math.random() * helloWordArr.length))]
  
  return (
    <header mt-18 class="outfit">
      <h1 text-6xl font-bold class="not-prose">
        <span class="block">Hello, </span>
        <span class="block mt-2">I'm Diu.</span>
      </h1>
      <div mt-6>
        <div>
          <span>Front-end & iOS developer / Amateur designer.</span>
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
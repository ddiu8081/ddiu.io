import Socials from './Socials'
import helloWordArr from '~/hello'

export default () => {
  const helloWord = helloWordArr[Math.floor((Math.random() * helloWordArr.length))]
  
  return (
    <header>
      <h1>
        <span class="block">{helloWord}, </span>
        <span class="block mt-2">I'm Diu.</span>
      </h1>
      <div mt-6>
        <div>
          <span>Front-end & iOS developer / Amateur designer.</span>
        </div>
        <div>
          <span>Currently working at DiDi.</span>
        </div>
      </div>
      <Socials />
    </header>
  )
}
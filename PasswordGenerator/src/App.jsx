import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length,setlength]=useState(8)
  const [numallow, setnumallow] = useState(false)
  const [charallow, setcharllow] = useState(false)
  const [password, setpassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallow) str += "1234567890"
    if(charallow) str += "!@#$%^&*-+_='"

    for(let i=1; i<= length ; i++){
      let charind = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(charind)
    }

    setpassword(pass)

  },[length,numallow,charallow,setpassword])

  const copyPasswordToclipboard = useCallback(()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  } ,[length,charallow,numallow,passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 mg-8 p-8 bg-gray-900
    text-orange-600">
      <h1 className="text-white text-center text-2xl my-8">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-2"
            placeholder='Generated Password'
            readonly
            ref={passwordRef}
        />
        <button className='outline-none bg-blue-800 text-black px-3 py-0.5 shrink-0'
          onClick={copyPasswordToclipboard}
        >
          copy
        </button>
      </div>
      
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1 '>
        <input 
          type='range'
          min={6}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setlength(e.target.value)}
          />
            <label>Length:{length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
          type='checkbox'
          defaultChecked={numallow}
          id='numInput'
          onChange={()=>{
            setnumallow((prev) => !prev)
          }}
        />
        <label htmlFor='numInput'>Numbers</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
          type='checkbox'
          id='charInput'
          defaultChecked={charallow}
          onChange={()=>{
            setcharllow((prev) => !prev)
          }}
        />
        <label htmlFor='charInput'>Character</label>
      </div>

    </div>
    </div>
  )
}

export default App

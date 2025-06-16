import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [containsNum, setContainsNum] = useState(false)
  const [containsChar, setContainsChar] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null);

  const copyPassToClickboard = useCallback (() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(containsNum) str+= "0123456789"
    if(containsChar) str+= "!@#$%^&*()_+=-[]{}~|"

    for(let i=1; i<= length; i++){
      let randomIndex = Math.floor(Math.random()*str.length)
      pass += str.charAt(randomIndex);
    }
    setPassword(pass)
  }, [length, containsNum ,containsChar])

  useEffect(() => {passGen()}, [length, containsNum, containsChar, setPassword])

  return (
    <>
      <div className='flex w-full h-screen items-center bg-gray-900'>
        <div className='w-full h-45 max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-green-400 bg-gray-700'>
          <h1 className='text-white text-center p-1.5'>Random Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input 
            type="text"
            value = {password}
            className='outline-none bg-white w-full py-1 px-3 text-black'
            placeholder='password'
            ref={passwordRef}
            readOnly
            />
            <button onClick={copyPassToClickboard} className=' hover:text-green-400 text-white active:text-green-600  font-medium px-4 py-1 rounded transition-all duration-200 cursor-pointer'>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={8}
              max={64}
              value={length}
              className='cursor-pointer'
              id = "forLength"
              onChange={(event) => {setLength(event.target.value)}}
              />
              <label for="forLength">Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              id = "forNum"
              type="checkbox"
              className='cursor-pointer'
               defaultChecked = {containsNum}
               onChange={() => {
                setContainsNum((prev) => !prev);
               }}
              />
              <label for="forNum">Numericals</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              id = "forChar"
              type="checkbox"
              className='cursor-pointer'
               defaultChecked = {containsChar}
               onChange={() => {
                setContainsChar((prev) => !prev);
               }}
              />
              <label for="forChar">Characters</label>
            </div>
          </div>
          <a href="https://github.com/rumman999" target='_blank'><p className='text-xs text-center mt-13  text-orange-500'>SpyCakes is learning.</p></a>
      </div>
      </div>
    </>
  )
}

export default App

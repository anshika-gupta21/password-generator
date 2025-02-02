import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  let [length, setLength] = useState(8);
  let [number, setNumber] = useState(false);
  let [char, setChar] = useState(false);
  let [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "1234567890";
    if (char) str += "!@#$%^&*()_";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, number, char, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 mt-28 text-orange-500 bg-gray-700">
      <h1 className="text-xl text-center text-white my-3 py-2 font-bold">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          placeholder="password"
          className="outline-none w-full py-1 px-3 my-3 bg-white font-bold"
          readOnly
          ref={passwordRef}
        />
        <button
          className="outline-none bg-orange-700 text-white px-3 py-0.5 my-3 shrink-0 hover:bg-orange-500 hover:cursor-pointer font-bold"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1 mb-3 mx-2">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length:{length} </label>
        </div>
        <div className="flex items-center gap-x-1 mb-3 mx-2">
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => setNumber((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1 mb-3 mx-2">
          <input
            type="checkbox"
            defaultChecked={char}
            id="charInput"
            onChange={() => setChar((prev) => !prev)}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;

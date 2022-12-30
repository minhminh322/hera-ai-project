import {useState, useEffect, useRef} from 'react';
import './App.css';
import {FormControl, Input, IconButton} from '@mui/material';
import PulseLoader from "react-spinners/PulseLoader";
import SendIcon from '@mui/icons-material/Send';
import Message from './components/Message';
import { Amplify, API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
const generateUID = () => {
  const timestamp = Date.now()
  const hexadecimalString = Math.random.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}

function App() {
  const [prompt, setPrompt] = useState("");
  // const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([{id: generateUID(), name: "heraai", text: "Xin chào, mình là Hera. Mình ở dây để trả lời bất kì câu hỏi nào bạn đưa ra   💁‍♀️"}]);
  const [isLoading, setisLoading] = useState(false)
  const bottomRef = useRef(null)

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  }
  const sendPrompt = async (e) => {
    e.preventDefault()
    
    setMessages(prevMessages => ([...prevMessages, {id: generateUID(), name: "me", text: prompt}]))
    setPrompt('');
    setisLoading(true)

  // Local ONLY
  // await fetch('http://localhost:3000/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ "prompt" : prompt })
  //   })
  //   .then((res) => res.json())
  //   .then((data) => setMessages(prevMessages => ([...prevMessages, {id: generateUID(), name: "heraai", text: data.bot.trim()}])))
  

  await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "prompt" : prompt })
    })
    .then((res) => res.json())
    .then((data) => setMessages(prevMessages => ([...prevMessages, {id: generateUID(), name: "heraai", text: data.bot.trim()}])))


    setisLoading(false)
    
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  // useEffect(() => {
  //   API.get("myAPI", "/prompts", {}).then((res) => console.log(res))
  // }, [])

  return (
    <div className="App">
      
      {/* <h2>Welcome Minh Hodler 💰</h2> */}
      {/* Large chat output */}

      <div className='message-container'>{
          messages.map((message) => 
            <Message key={message.id} name={message.name} text={message.text}></Message>
          )
        }
      <PulseLoader
        color="#0b81ff"
        loading={isLoading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        <div ref={bottomRef} />
        </div>

        

      {/* small chat input */}
      <form className='app-form'>
        <FormControl className='app-formControl'></FormControl>
        <Input
          className='app-input'
          placeholder='Hãy hỏi mình bất kì điều gì!'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} />
        <IconButton className='app-iconButton' variant='text' color='primary' onClick={sendPrompt} type="submit"><SendIcon /></IconButton>
      </form>
    </div>
  );
}

export default App;

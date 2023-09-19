import { Router } from 'express';


const useChat = Router();


useChat.get('/chat', (req, res) => {
    res.send('this is chat api')
});


export default useChat;
import express from 'express';
import {registerUser, loginUser, updatedUser, getUserProfile} from '../controllers/userController.mjs';
import {authentication, authorization} from '../auth/authentication.mjs';
import { createNote, deleteNote, getNotes, updateNotes } from '../controllers/notesController.mjs';
const router = express.Router();
router.get('/', (req, res)=>{
    res.send("Hello Users")
})
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.put('/update', authentication, authorization, updatedUser);
router.get('/profile/:id', authentication, authorization, getUserProfile);
router.get('/notes', authentication, authorization, getNotes);
router.post('/notes', authentication, authorization, createNote);
router.put('/notes/:id', authentication, authorization, updateNotes);
router.delete('/notes/:id', authentication, authorization, deleteNote);
export default router;
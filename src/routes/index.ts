import express, {Router} from 'express';




const router = Router();

router.get('/', (req, res) => {
    return res.json({msg: 'Hello world!'});
});



router.get('/other-route', (req, res)=>{
    return res.json({res: 'another route'})
})

export default router;


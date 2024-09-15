import app from './app.js'
import 'dotenv/config'
const port=process.env.PORT



app.listen(port, ()=>{

    console.log(`your server is running at http://localhost:${port}`)
})
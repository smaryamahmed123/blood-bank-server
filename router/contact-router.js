import express from 'express'
import contactForm from '../controllers/contact-control.js'
const contactRouter = express.Router()

contactRouter.route("/contact").post(contactForm)

export default contactRouter;
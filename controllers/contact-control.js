import contactModel from '../module/contact-Schema.js'

 const contactForm = async (req, res)=>{
    try {
        const response = req.body;
        await contactModel.create(response);
        return res.status(200).json({message: "message send successfully"})
    } catch (error) {
        return res.status(500).json({message: "message not delivered"})

    }
}

export default contactForm

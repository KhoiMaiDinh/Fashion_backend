const NotFoundError = require('../errors/notFoundError');
const Color = require('../models/Color')

exports.postCreateColor = async (req,res)=>{
    try{
        const name = req.body.name;
        const code= req.body.code;
        const color = new Color({
            name,code
        });

        await color.save();
        res.status(201).json({
            message: 'Color created successfully',
            color: color,
        });
    }
    catch(err){
        if (err.code === 11000 && err.keyValue.name) {
            const message = `${err.keyValue.name} has already existed`;
            console.log(message);
            res.status(400).json({
              error: message,
            });
          } 
            
        throw err;
    }
};

exports.updateColor = async (req,res) =>{
    try{
        const _id= req.params._id;
        const name= req.body.name;
        const code= req.body.code;

        const color= await Color.findById(_id);
        color.name= name;
        color.code=code;
        const updateColor= await color.save();
        res.status(200).json({
            message: 'Color updated',
            color: updateColor
        });
    }
    catch(err){
        throw err;
    }
};

exports.deleteColor= async(req,res)=>{
    try{
        const _id= req.params._id;
        const color= await Color.findByIdAndUpdate({_id},{isDeleted: true},{new: true});

        res.status(200).json({
            message: 'Deleted Color successfully',
            color: color,
        });
    }
    catch(err){
        throw err;
    }
};

exports.getColorById = async(req,res)=>{
    try{
        const _id= req.params._id;
        const color= await Color.findById(_id);
        if(color&&color.isDeleted===false){
            res.status(200).json(color);
        }
        else if(color&&color.isDeleted===true){
            res.status(410).send('Color is deleted')
        }
        else{
            throw new NotFoundError('Color not found');
        }
    }
    catch(err){
        throw err;
    }
};

exports.getAllColor= async(req,res)=>{
    await Color.find({isDeleted: false})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        throw err;
    })
};

exports.getDeletedColor = async(req,res)=>{
    Color.find({isDeleted: true})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        throw err;
    })
};

var express = require('express');
var router = express.Router();
const protect = require('../middleware/authMiddleware');
const CropSearch = require('../modals/recentCropSearchModel');
const Soil = require('../modals/recentSoilFormModel');
const Crop = require('../modals/recentCropFormModel');


// For storing recent searched crop names
router.post('/store_crop', protect, async (req, res, next) => {
    try {
        const searchExist = await CropSearch.findOne({crop:req.body.cropname})
        if(!searchExist){
            let arr = await CropSearch.find({ user: req.id }).sort({ createdAt: -1 });
            if (arr.length === 5) {
                await CropSearch.findByIdAndDelete(arr[4]._id);                
                arr = await CropSearch.find({ user: req.id }).sort({ createdAt: -1 }); // Fetch updated searches after deletion

            }
            const search = new CropSearch({
                user : req.id,
                crop : req.body.cropname,
            })
            await search.save();
            res.send({ data: search });
        }
        else {
            await CropSearch.findByIdAndDelete(searchExist._id)
            const search = new CropSearch({
                user: req.id,
                crop: req.body.cropname,
            })
            await search.save();
            res.send({ data: search });
        }
    } catch (error) {
        res.status(500).send("Error in storing crop",error.message );
    }
})

// api to get the above stored crop to display in recent crop search
router.get('/fetch_crop', protect, async(req,res,next)=>{
    try {
        const recentCrop = await CropSearch.find({ user: req.id });
        res.status(200).send({ recentCrop });
    } catch (error) {
        res.status(500).send("Error in fetching the stored crops in recent searches",error.message );
    }
})


// Form submit to store info of soil 
router.post('/submit_soil', protect, async (req, res, next) => {
    try {
        const { nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph } = req.body;
        const newCropInfo = new Soil({
            user: req.id,
            nitrogen: req.body.nitrogen,
            phosphorous: req.body.phosphorous,
            potassium: req.body.potassium,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            rainfall: req.body.rainfall,
            ph: req.body.ph
        });
        await newCropInfo.save();
        res.status(201).send('Soil information stored successfully');
    } catch (error) {
        res.status(500).send("Error in fetching storing soil info to history",error.message );
    }
});

// api to store crop form info
router.post('/submit_crop', protect, async (req, res, next) => {
    try {
        const { cropname,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph } = req.body;
        const newCropInfo = new Crop({
            user: req.id,
            crop: req.body.cropname,
            nitrogen: req.body.nitrogen,
            phosphorous: req.body.phosphorous,
            potassium: req.body.potassium,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            rainfall: req.body.rainfall,
            ph: req.body.ph
        });
        await newCropInfo.save();

        res.status(201).send('Crop information stored successfully');
    } catch (error) {
        res.status(500).send("Error in fetching storing crop info to history",error.message );
    }
});


// for crop form
router.get('/recent_crop', protect, async (req, res, next) => {
    try {
        const recentCrop = await Crop.find({ user: req.id });
        res.status(200).send({ recentCrop });
    } catch (error) {
        res.status(500).send("Error in fecthing crop info from history",error.message );
    }
})

// for soil form
router.get('/recent_soil', protect, async (req, res, next) => {
    try {
        const recentSearch = await Soil.find({ user: req.id });
        res.status(200).send({ recentSearch });
    } catch (error) {
        res.status(500).send("Error in fecthing soil info from history",error.message );
    }
})

module.exports = router;
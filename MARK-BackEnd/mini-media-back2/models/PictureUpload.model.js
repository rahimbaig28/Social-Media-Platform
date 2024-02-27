let mongoose = require('mongoose');
let Schema = mongoose.Schema;

pictureSchema = new Schema( 
    {
        caption: String,
        email:String,
        username:String,
        image1:String,
        comments:Array,
        pictureUploadedDate:String,
        type:String
    },
  ),
Detail = mongoose.model('Pictures', pictureSchema);

module.exports = Detail;
import mongoose, { Schema } from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    patternName: {
        type: String,
        required: [true, "Project name is required!"],
        minlength: [2, "Must be longer than 2 characters!"],
        unique: true
    }
    ,
    image_URL: {
        type: String
    }
    ,
    projectCategory: {
        type: String
    }
    ,
    dateStarted: {
        type: Date
    }
    ,
    estimatedEndDate: {
        type: Date
    }
    ,
    hookSize: {
        type: String
    }
    ,
    patternLocation: {
        type: String
    }
    ,
    yarnBrand: {
        type: String
    }
    ,
    yarnColor: {
        type: String
    }
    ,
    notes: {
        type: String
    }
    ,
    completed: {
        type: Boolean,
        default: false
    }
    // ,
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // }
    
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)
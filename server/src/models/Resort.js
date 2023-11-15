import { Schema } from "mongoose";

export const ResortSchema = new Schema({
    snoId: { type: Number, required: true },
    resortImg: { type: String, maxLength: 500 },
    trailImg: { type: String, maxLength: 500 },
    address: { type: String, maxLength: 500 },
    lat: { type: Number, min: -90, max: 90 },
    lon: { type: Number, min: -180, max: 180 }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})


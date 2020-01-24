import { getPlaces } from "../services/providers/OpenCageDataProvider";
import { HTTP400Error } from "../utils/httpErrors";
import * as joi from 'joi';

export const getPlacesByNameValidator =  joi.object({q: joi.string().required()});

export const getPlacesByName = async (q: string) => {

  try {
   await  getPlacesByNameValidator.validate({q}); 
    if (q.length < 3) {
      return {
        type: "FeatureCollection",
        features: []
      };
    }
    return await getPlaces(q);
    
  } catch (e) {
    if(e.isJoi){
      console.log('error', e);
      throw new HTTP400Error(JSON.stringify( { error: e.message }))
    }
  }
};


export const getPlacesByNameV2 = async ( req:any, res:any) => {

 try {
   const {q}= req.query;
   await  getPlacesByNameValidator.validate({q}); 
   if (q.length < 3) {
    res.status(200);
    res.json ({
      type: "FeatureCollection",
      features: []
    });
  }
   const data =  await getPlaces(q);

   res.status(200);
   res.json(data);

 } catch(e) {
   res.status(400);
   res.json(new HTTP400Error(JSON.stringify( { error: e.message })))
 }
};
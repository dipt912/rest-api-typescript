import { getPlacesByNameV2 } from "../../controllers/SearchController";
import { checkSearchParams } from "../../middleware/checks";
import {redisDb} from '../../services/redisClient'
export default [
  {
    path: "/api/v1/search",
    method: "get",
    handler:  [ redisDb.chekcAuthTokenId, checkSearchParams, getPlacesByNameV2]
  }
];
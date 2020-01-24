import request from "request-promise";
import * as SearchController from "./SearchController";

jest.mock("request-promise");

describe('getPlacesByName', () => {
    test("an empty query string", async () => {
        (request as any).mockImplementation(() => '{"features": []}');
        const result = await SearchController.getPlacesByName("Paris");
        expect(result).toEqual({ features: [] });
      });
    
      test("an invalid non-json response", async () => {
        (request as any).mockImplementation(() => "Service Unavailable.");
        await expect(SearchController.getPlacesByName("")).rejects.toThrow();
      });
});
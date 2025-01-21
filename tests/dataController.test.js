require("dotenv").config();
const {
  createNewUser,
  searchImages,
  saveNewPhotos,
  addTags,
  searchByTag,
  searchHistoryByUserId,
} = require("../controllers/dataController");
const { searchImagesFromUnsplash } = require("../controllers/userController");
const axiosInstance = require("../lib/axios.lib");

jest.mock("../lib/axios.lib.js", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("Data Controller Tests", () => {
  test("should fetch images with given query success", async () => {
    const mockResponse = {
      photos: [
        {
          imageUrl:
            "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNzMyODc5NDczfDA&ixlib=rb-4.0.3&q=80&w=400",
          description: "No description available",
          altDescription: "orange flowers",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHwyfHxuYXR1cmV8ZW58MHx8fHwxNzMyODc5NDczfDA&ixlib=rb-4.0.3&q=80&w=400",
          description:
            "You can help and support me via my description (Paypal) !\n\nInstagram : @clvmentm\nFacebook Page : www.facebook.com/CMReflections/\n\nIf you wish to buy it in full quality, email me on clementmreflections@gmail.com.",
          altDescription: "photo of pine trees",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHwzfHxuYXR1cmV8ZW58MHx8fHwxNzMyODc5NDczfDA&ixlib=rb-4.0.3&q=80&w=400",
          description: "Finding my roots",
          altDescription: "sun light passing through green leafed tree",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHw0fHxuYXR1cmV8ZW58MHx8fHwxNzMyODc5NDczfDA&ixlib=rb-4.0.3&q=80&w=400",
          description: "No description available",
          altDescription: "white clouds during daytime",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHx8fHwxNzMyODc5NDczfDA&ixlib=rb-4.0.3&q=80&w=400",
          description: "Maldives",
          altDescription: "aerial photo of seashore",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHw2fHxuYXR1cmV8ZW58MHx8fHwxNzMyODc5NDczfDA&ixlib=rb-4.0.3&q=80&w=400",
          description: "Flying through a storm into the sunset.",
          altDescription: "clouds during golden hour",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1529419412599-7bb870e11810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHw3fHxuYXR1cmV8ZW58MHx8fHwxNzMyODc5NDczfDA&ixlib=rb-4.0.3&q=80&w=400",
          description: "No description available",
          altDescription: "bed of orange flowers",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHw4fHxuYXR1cmV8ZW58MHx8fHwxNzMyODc5NDczfDA&ixlib=rb-4.0.3&q=80&w=400",
          description: "Pooling Water",
          altDescription: "green leaf with water drops",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHw5fHxuYXR1cmV8ZW58MHx8fHwxNzMyODc5NDczfDA&ixlib=rb-4.0.3&q=80&w=400",
          description:
            "It was at 1pm a monday. I was on holliday and i wanted to make something cool for my day, so I saw the fog outside of my house and these kinde of orange / green trees. So I said why not go to this little path near my house, and this is how the photo was made!",
          altDescription: "road between yellow leaf trees at daytime",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA0MTd8MHwxfHNlYXJjaHwxMHx8bmF0dXJlfGVufDB8fHx8MTczMjg3OTQ3M3ww&ixlib=rb-4.0.3&q=80&w=400",
          description: "Not so tasty",
          altDescription: "red and white mushroom",
        },
      ],
    };
    const query = "nature";
    const images = await searchImagesFromUnsplash(query);
    axiosInstance.get.mockResolvedValue(mockResponse);
    const req = { query: { query: "nature" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };
    await searchImages(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith("/search/photos", {
      params: { query: "nature", per_page: 10 },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });
    expect(images).toEqual(mockResponse);
  });

  it("should handle API errors gracefully", async () => {
    const req = {
      query: { query: "nature" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    axiosInstance.get.mockRejectedValue({
      response: { status: 500 },
    });

    await searchImages(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch images from Unsplash.",
      message: "--Failed to fetch image details--",
    });
  });

  // test("should fetch hotels by location", async () => {
  //   const mockResponse = {
  //     hotels: [
  //       {
  //         id: 1,
  //         name: "Bechtelar LLC Hotel",
  //         location: "Cuttack",
  //         price_per_night: 29991.83,
  //         available_rooms: 6,
  //       },
  //     ],
  //   };
  //   axiosInstance.get.mockResolvedValue(mockResponse);
  //   const req = { query: { location: "Cuttack" } };
  //   const res = { json: jest.fn(), status: jest.fn(() => res) };
  //   await getHotelsByLocation(req, res);

  //   expect(axiosInstance.get).toHaveBeenCalledWith(
  //     `/hotels/search?location=Cuttack`
  //   );
  //   expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  // });

  // test("should fetch sites by location", async () => {
  //   const mockResponse = {
  //     sites: [
  //       {
  //         id: 2,
  //         name: "Kemmer - Bailey Site",
  //         location: "Chikballapur",
  //         description: "Tam necessitatibus vapulus magnam.",
  //       },
  //     ],
  //   };
  //   axiosInstance.get.mockResolvedValue(mockResponse);
  //   const req = { query: { location: "Chikballpur" } };
  //   const res = { json: jest.fn(), status: jest.fn(() => res) };
  //   await getSitesByLocation(req, res);

  //   expect(axiosInstance.get).toHaveBeenCalledWith(
  //     `/sites/search?location=Chikballpur`
  //   );
  //   expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  // });
});

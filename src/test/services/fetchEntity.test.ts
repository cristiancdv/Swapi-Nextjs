import { fetchEntity } from "@/services/fetchEntity";

describe("fetchEntity", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("should fetch the entity successfully", async () => {
    const mockData = { name: "Luke Skywalker" };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchEntity("https://strw/api/people/1");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("https://strw/api/people/1");
  });

  it("should throw an error on fetch failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchEntity("https://strw/api/people/404")).rejects.toThrow("Error fetching https://strw/api/people/404: undefined");
  });
});
